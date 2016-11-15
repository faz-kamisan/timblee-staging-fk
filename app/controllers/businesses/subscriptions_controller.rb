class Businesses::SubscriptionsController < ApplicationController

  protect_from_forgery except: :webhook
  skip_before_action :authenticate_user!, only: :webhook
  skip_before_action :lock_business_after_trial_end, only: [:create, :webhook]
  before_action :load_plan, :check_validity, only: :create
  around_action :wrap_in_transaction, only: :create
  before_action :deactivate_old_subscription , only: :create

  def create
    if @plan.stripe_plan_id == STARTER_STRIPE_ID
      activate_starter_plan
    elsif @plan.stripe_plan_id == PRO_STRIPE_ID
      activate_pro_plan
    end
  end

  def webhook
    @event = Stripe::Event.retrieve(params['id'])

    if @event.type == 'charge.succeeded' || @event.type == 'charge.refunded' || @event.type == 'charge.failed' || @event.type == 'customer.subscription.updated'
      business =  Business.find_by(stripe_customer_id: @event.data.object.customer)
      if business.present?
        LoggerExtension.stripe_log "Webhook Params:#{params}\n\nEvent: #{@event.inspect}\n\nBusiness: #{business.inspect}\n\n}"
        user = business.owner

        if @event.type == 'charge.succeeded'
          PaymentNotifier.delay.success(user, @event)

        elsif @event.type == 'charge.refunded'
          PaymentNotifier.delay.refund(user, @event)

        elsif @event.type == 'charge.failed'
          PaymentNotifier.delay.failure(user, @event)

        elsif @event.type == 'customer.subscription.updated'
          renew_subscription if @event.data.object.quantity > 0
        end
      else
        LoggerExtension.stripe_log "Webhook Business not found"
        PaymentNotifier.delay.webhook_error(params, @event)
      end
    end

    render status: :ok, json: 'success'

  end

  private

    def renew_subscription
      subscription = Subscription.where(stripe_subscriptions_id: @event.data.object.id).order(:created_at).last
      subscription.update_end_time(Time.at(@event.data.object.current_period_end))
      LoggerExtension.stripe_log "Subscription: #{subscription.inspect} end_at updated."
    end

    def activate_pro_plan
      LoggerExtension.highlight
      LoggerExtension.stripe_log "Params:#{params}\n\nUser: #{current_user.inspect}\n\nBusiness: #{current_business.inspect}\n\nOld Subscription: #{@current_subscription.try(:inspect)}"

      emails = params[:email].split(/\s* \s*/)
      current_business.set_new_subscription(emails)
      LoggerExtension.stripe_log "New Subscription: #{current_business.subscriptions.last.inspect}"

      StripePaymentService.new(current_business).update_subscription
      LoggerExtension.stripe_log "Subscription on stripe created/updated successfully"

      InvitationService.invite_users(emails, current_user, params[:custom_message])
      LoggerExtension.stripe_log "Invitation sent to users with emails: #{emails}"
      analytics.track_pro_plan(@current_subscription)

      LoggerExtension.highlight
      respond_to do |format|
        format.html do
          redirect_to team_settings_users_path, notice: t('pro_plan_success', scope: :flash, users: current_business.subscriptions.last.no_of_users)
        end
        format.js do
          render js: ("document.setFlash(" + "'#{t('pro_plan_success', scope: :flash, users: current_business.subscriptions.last.no_of_users)}'" + ")")
        end
      end

      rescue Stripe::CardError => e
        LoggerExtension.stripe_log "Stripe::CardError : #{e.inspect}"
        LoggerExtension.highlight
        respond_to do |format|
          format.html do
            redirect_to billing_settings_users_path, alert: e.message
          end
          format.js do
            render js: ("document.setFlash(" + "'#{e.message}'" + ")")
          end
        end
    end

    def activate_starter_plan
      if @current_subscription
        LoggerExtension.highlight
        LoggerExtension.stripe_log "Params:#{params}\n\nUser: #{current_user.inspect}\n\nBusiness: #{current_business.inspect}\n\nOld Subscription: #{@current_subscription.try(:inspect)}"
        StripePaymentService.new(current_business).remove_old_subscription
        LoggerExtension.highlight
      end

      current_business.update(is_pro: false, has_plan: true)
      analytics.track_starter_plan(@current_subscription)
      respond_to do |format|
        format.html do
          redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
        end
        format.js do
          render js: ("document.setFlash(" + "'#{t('.success', scope: :flash)}'" + ")")
        end
      end
    end

    def load_plan
      @plan = Plan.find_by(stripe_plan_id: params[:stripe_plan_id])
      unless @plan
        LoggerExtension.stripe_log "Exception Plan not found"
        PaymentNotifier.delay.exception(current_user,  "Exception Plan #{params[:stripe_plan_id]} not found")
        redirect_to billing_settings_users_path, alert: t('.plan_not_found', scope: :flash)
      end
    end

    def deactivate_old_subscription
      @current_subscription = current_business.is_pro_plan? ? current_business.subscriptions.order(:created_at).last : nil
      if @current_subscription && !@current_subscription.update(end_at: Time.current)
        LoggerExtension.stripe_log "Exception: #{@current_subscription.errors.full_messages}"
        PaymentNotifier.delay.exception(current_user,  "Exception: #{@current_subscription.errors.full_messages}")
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

    def check_validity
      if @plan.stripe_plan_id == STARTER_STRIPE_ID && !current_business.allow_downgrade_to_starter?
        LoggerExtension.stripe_log "Cannot downgrade business plan due to more no of users or sitemaps"
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

    def wrap_in_transaction
      begin
        ActiveRecord::Base.transaction do
          yield
        end
      rescue => e
        LoggerExtension.stripe_log "Exception Transaction Rollback : #{e.inspect}"
        PaymentNotifier.delay.exception(current_user,  "Exception Transaction Rollback : #{e.inspect}")
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

end

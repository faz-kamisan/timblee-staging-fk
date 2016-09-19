class Businesses::SubscriptionsController < ApplicationController

  protect_from_forgery except: :webhook
  skip_before_action :authenticate_user!, only: :webhook
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
    business =  Business.find_by(stripe_customer_id: @event.data.object.customer)
    LoggerExtension.stripe_log "Params:#{params}\n\Event: #{@event.inspect}\n\nBusiness: #{business.inspect}\n\n}"
    user = business.owner

    if @event.type == 'charge.succeeded'
      PaymentNotifier.delay.success(user, @event)

    elsif @event.type == 'charge.refunded'
      PaymentNotifier.delay.refund(user, @event)

    elsif @event.type == 'charge.failed'
      PaymentNotifier.delay.failure(user, @event)

    elsif @event.type == 'customer.subscription.updated'
      renew_subscription
    end
    render status: :ok, json: 'success'

  end

  private

    def renew_subscription
      subscription = Subscription.find_by(stripe_subscriptions_id: @event.data.object.id)
      subscription.update_end_time(Time.at(@event.data.object.current_period_end))
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
      LoggerExtension.highlight

      redirect_to team_settings_users_path, notice: t('pro_plan_success', scope: :flash, users: current_business.subscriptions.last.no_of_users)

      rescue Stripe::CardError => e
        LoggerExtension.stripe_log "Stripe::CardError : #{e.inspect}"
        LoggerExtension.highlight

        redirect_to billing_settings_users_path, alert: e.message
    end

    def activate_starter_plan
      if @current_subscription
        LoggerExtension.highlight
        LoggerExtension.stripe_log "Params:#{params}\n\nUser: #{current_user.inspect}\n\nBusiness: #{current_business.inspect}\n\nOld Subscription: #{@current_subscription.try(:inspect)}"
        StripePaymentService.new(current_business).remove_old_subscription
        LoggerExtension.highlight
      end

      current_business.update(is_pro: false, has_plan: true)
      redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
    end

    def load_plan
      @plan = Plan.find_by(stripe_plan_id: params[:stripe_plan_id])
      unless @plan
        redirect_to billing_settings_users_path, alert: t('.plan_not_found', scope: :flash)
      end
    end

    def deactivate_old_subscription
      @current_subscription = current_business.current_subscription
      if @current_subscription && !@current_subscription.update(end_at: Time.current)
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

    def check_validity
      if @plan.stripe_plan_id == STARTER_STRIPE_ID && !current_business.allow_downgrade_to_starter?
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

    def wrap_in_transaction
      begin
        ActiveRecord::Base.transaction do
          yield
        end
      rescue
        redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
      end
    end

end

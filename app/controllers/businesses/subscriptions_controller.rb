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
    user = Business.find_by(stripe_customer_id: @event.data.object.customer).owner

    if @event.type == 'charge.succeeded'
      PaymentNotifier.delay.success(user, @event)

    elsif @event.type == 'charge.refunded'
      PaymentNotifier.delay.refund(user, @event)

    elsif @event.type == 'charge.failed'
      PaymentNotifier.delay.failure(user, @event)
    end
    render status: :ok, json: 'success'

  end

  private

    def activate_pro_plan
      emails = params[:email].split(/\s* \s*/)
      no_of_users = current_business.users.count + InvitationService.get_invitable_users_count(emails)

      current_business.subscriptions.build(no_of_users: no_of_users, quantity: Business.monthly_charge(no_of_users))
      current_business.is_pro = true
      current_business.has_plan = true
      StripePaymentService.new(current_business).update_subscription

      InvitationService.invite_users(emails, current_user, params[:custom_message])
      redirect_to team_settings_users_path, notice: t('.success', scope: :flash)

      rescue Stripe::CardError => e
        redirect_to billing_settings_users_path, alert: e.message
    end

    def activate_starter_plan
      StripePaymentService.new(current_business).remove_old_subscription if @current_subscription

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

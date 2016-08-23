class Businesses::SubscriptionsController < ApplicationController

  before_action :load_plan, :check_validity, only: :create
  around_action :wrap_in_transaction, only: :create
  def create
    if @plan.stripe_plan_id == STARTER_STRIPE_ID
      activate_starter_plan
    elsif @plan.stripe_plan_id == PRO_STRIPE_ID
      activate_pro_plan
    end
  end

  private
    def activate_pro_plan
      current_business.subscriptions.build(plan: @plan, no_of_users: params[:no_of_users], quantity: Business.monthly_charge(params[:no_of_users].to_i))

      stripe_payment_service = StripePaymentService.new(current_business)
      stripe_payment_service.add_card(params[:stripeToken]) if params[:stripeToken]
      stripe_payment_service.create_subscription
      redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)

      rescue Stripe::CardError => e
        redirect_to billing_settings_users_path, alert: e.message
    end

    def activate_starter_plan
      current_business.subscriptions.build(plan: @plan)
      current_business.save
      redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
    end

    def load_plan
      @plan = Plan.find_by(stripe_plan_id: params[:stripe_plan_id])
      unless @plan
        redirect_to billing_settings_users_path, alert: t('.plan_not_found', scope: :flash)
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

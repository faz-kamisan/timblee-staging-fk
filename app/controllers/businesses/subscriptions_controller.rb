class Businesses::SubscriptionsController < ApplicationController

  def create
    plan = Plan.find_by(stripe_plan_id: params[:stripe_plan_id])
    current_business.subscriptions.build(plan: plan, no_of_users: params[:no_of_users], quantity: Business.monthly_charge(params[:no_of_users].to_i))

    stripe_payment_service = StripePaymentService.new(current_business)
    stripe_payment_service.add_card(params[:stripeToken]) if params[:stripeToken]
    stripe_payment_service.create_subscription
    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)

    rescue Stripe::CardError => e
      redirect_to billing_settings_users_path, alert: e.message

  end

  def activate_starter_plan
    plan = Plan.find_by(stripe_plan_id: params[:stripe_plan_id])
    current_business.subscriptions.build(plan: plan)
    current_business.save!
    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
  end

end

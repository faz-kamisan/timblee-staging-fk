class Businesses::CardsController < ApplicationController

  def create
    stripe_payment_service = StripePaymentService.new(current_business).add_card(params[:stripeToken])

    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)

    rescue Stripe::CardError => e
      redirect_to billing_settings_users_path, alert: e.message

    rescue Stripe::InvalidRequestError => e
      redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
  end

end

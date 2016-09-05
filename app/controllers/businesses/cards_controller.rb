class Businesses::CardsController < ApplicationController

  def create
    StripePaymentService.new(current_business).add_card(params[:stripeToken])
    customer = Stripe::Customer.retrieve(current_business.stripe_customer_id)
    @card = customer.sources.retrieve(customer.default_source)

    respond_to do |format|
      format.html{ redirect_to billing_settings_users_path, notice: t('.success', scope: :flash) }
      format.js  { flash.now[:notice] = t('.success', scope: :flash) }
    end

    rescue Stripe::CardError => e

      respond_to do |format|
        format.html{ redirect_to billing_settings_users_path, alert: e.message }
        format.js  { flash.now[:alert] = e.message }
      end

    rescue Stripe::InvalidRequestError => e


      respond_to do |format|
        format.html{ redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash) }
        format.js  { flash.now[:alert] = t('.failure', scope: :flash) }
      end
  end

end

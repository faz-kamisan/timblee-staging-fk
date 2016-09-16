class Businesses::CardsController < ApplicationController
  around_action :wrap_in_transaction, only: :create

  def create
    LoggerExtension.highlight
    StripePaymentService.new(current_business).add_card(params[:stripeToken])
    customer = Stripe::Customer.retrieve(current_business.stripe_customer_id)
    card = customer.sources.retrieve(customer.default_source)
    @card = Card.create(last4: card.last4, brand: card.brand, business: current_business)
    LoggerExtension.stripe_log "User card created: #{@card.inspect}"
    LoggerExtension.highlight

    respond_to do |format|
      format.html{ redirect_to billing_settings_users_path, notice: t('.success', scope: :flash) }
      format.js  { flash.now[:notice] = t('.success', scope: :flash) }
    end

    rescue Stripe::CardError => e
      @card = current_business.active_card

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

  private

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

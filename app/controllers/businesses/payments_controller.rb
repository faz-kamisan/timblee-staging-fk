class Businesses::PaymentsController < UsersController

  def create
    credit_card_service = CreditCardService.new(current_business)
    if current_business.stripe_customer_id
      credit_card_service.create_card(params[:stripeToken])
    else
      credit_card_service.create_customer(params[:stripeToken])
    end

    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)

  rescue Stripe::CardError => e
    redirect_to billing_settings_users_path, alert: e.message

  rescue Stripe::InvalidRequestError => e
    redirect_to billing_settings_users_path, alert: t('.failure', scope: :flash)
  end
end

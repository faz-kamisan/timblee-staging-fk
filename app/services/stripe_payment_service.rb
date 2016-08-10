class StripePaymentService

  attr_accessor :customer

  def initialize(current_business)
    @current_business = current_business
  end

  def add_card(stripe_token)
    if @current_business.stripe_customer_id
      create_card(stripe_token)
    else
      create_customer(stripe_token)
    end
  end

  def create_card(stripe_token)
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
    card = customer.sources.create(
      source: stripe_token
    )
    customer.default_source = card.id
    customer.save
  end

  def create_customer(stripe_token)
    @customer = Stripe::Customer.create(
      email:  @current_business.owner.email,
      source: stripe_token
    )
    @current_business.update_column(:stripe_customer_id, customer.id)
  end

end

class StripePaymentService

  attr_accessor :customer

  def initialize(current_business)
    @current_business = current_business
  end

  def add_card(stripe_token)
    if @current_business.stripe_customer_id
      create_card(stripe_token)
    else
      create_customer_with_card(stripe_token)
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

  def create_customer_with_card(stripe_token)
    @customer = Stripe::Customer.create(
      email:  @current_business.owner.email,
      source: stripe_token
    )
    @current_business.update_column(:stripe_customer_id, customer.id)
  end

  def remove_old_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
    @customer.subscriptions.first.try(:delete)
  end

  def create_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
    subscription_hash = {
        customer: @current_business.stripe_customer_id,
        plan:     @current_business.subscriptions.last.plan.stripe_plan_id,
        quantity: @current_business.subscriptions.last.quantity
    }

    subscription_hash.merge!({trial_end: @current_business.trial_end_at.to_time.to_i}) if @current_business.in_trial_period?

    current_subscription = @customer.subscriptions.first
    if current_subscription
      current_subscription.quantity = @current_business.subscriptions.last.quantity
      current_subscription.save
    else
      Stripe::Subscription.create(subscription_hash)
    end
    @current_business.save!
  end

end

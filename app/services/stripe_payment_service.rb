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
    card = @customer.sources.create(
      source: stripe_token
    )
    @customer.default_source = card.id
    @customer.save
  end

  def create_customer_with_card(stripe_token)
    @customer = Stripe::Customer.create(
      email:  @current_business.owner.email,
      source: stripe_token
    )
    @current_business.update_column(:stripe_customer_id, @customer.id)
  end

  def remove_old_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
    current_subscription = @customer.subscriptions.first
    current_subscription.quantity = 0
    current_subscription.save
    settle_all_balances
    current_subscription.delete
  end

  def settle_all_balances
    upcoming_invoice = Stripe::Invoice.upcoming(:customer => @customer.id)
    if upcoming_invoice.total > 0
      charge_customer(upcoming_invoice.total)
    elsif upcoming_invoice.total < 0
      refund_customer(upcoming_invoice.total.abs)
    end
  end

  def charge_customer(amount)
    Stripe::Charge.create(
      :amount => amount,
      :currency => "usd",
      :customer => @customer.id,
      :description => "Charge for final settlement"
    )
  end

  def refund_customer(amount)
    Stripe::Refund.create(
      charge: @customer.charges.first,
      amount: amount
    )
  end

  def update_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)

    current_subscription = @customer.subscriptions.first
    if current_subscription
      current_subscription.quantity = @current_business.subscriptions.last.quantity
      current_subscription.save
    else
      create_subscription
    end
    @current_business.save!
  end

  def create_subscription
    subscription_hash = {
        customer: @current_business.stripe_customer_id,
        plan:     PRO_STRIPE_ID,
        quantity: @current_business.subscriptions.last.quantity
    }

    subscription_hash.merge!({ trial_end: @current_business.trial_end_at.to_time.to_i }) if @current_business.in_trial_period?
    Stripe::Subscription.create(subscription_hash)
  end

end

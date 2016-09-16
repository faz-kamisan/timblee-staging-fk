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


  def remove_old_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
    LoggerExtension.stripe_log "STRIPE CUSTOMER: #{@customer.inspect}"
    current_subscription = @customer.subscriptions.first
    LoggerExtension.stripe_log "STRIPE SUBSCRIPTION TO BE DELETED: #{current_subscription.inspect}"
    current_subscription.quantity = 0
    current_subscription.save
    settle_all_balances
    LoggerExtension.stripe_log "OLD BALANCES SETTLED!!"
    current_subscription.delete
    LoggerExtension.stripe_log "STRIPE SUBSCRIPTION DELETED SUCCESSFULLY!"
  end

  def update_subscription
    @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)

    LoggerExtension.stripe_log "STRIPE CUSTOMER: #{@customer.inspect}"
    current_subscription = @customer.subscriptions.first
    if current_subscription
      LoggerExtension.stripe_log "STRIPE SUBSCRIPTION TO BE UPDATED: #{current_subscription.inspect}"
      current_subscription.quantity = @current_business.subscriptions.last.quantity
      current_subscription.save
      LoggerExtension.stripe_log "UPDATED STRIPE SUBSCRIPTION: #{current_subscription.inspect}"
    else
      create_subscription
    end
    @current_business.save!
    LoggerExtension.stripe_log "NEW SUBSCRIPTION: #{@current_business.current_subscription.inspect}"
  end

  private

    def settle_all_balances
      upcoming_invoice = Stripe::Invoice.upcoming(:customer => @customer.id)
      LoggerExtension.stripe_log "LAST INVOICE TO SETTLE #{upcoming_invoice.inspect}"
      if upcoming_invoice.total > 0
        charge_customer(upcoming_invoice.total)

      elsif upcoming_invoice.total < 0
        refund_customer(upcoming_invoice.total.abs)
      end
    end

    def charge_customer(amount)
      LoggerExtension.stripe_log "AMOUNT TO BE CHARGED #{amount}"
      charge = Stripe::Charge.create(
        :amount => amount,
        :currency => "usd",
        :customer => @customer.id,
        :description => "Charge for final settlement"
      )
      LoggerExtension.stripe_log "CUSTOMER CHARGED SUCCESSFULLY #{charge.inspect}"
    end

    def refund_customer(amount)
      LoggerExtension.stripe_log "AMOUNT TO BE REFUNDED #{amount}"
      refund = Stripe::Refund.create(
        charge: @customer.charges.first,
        amount: amount
      )
      LoggerExtension.stripe_log "CUSTOMER CHARGE REFUNDED SUCCESSFULLY #{refund.inspect}"
    end

    def create_subscription
      subscription_hash = {
          customer: @current_business.stripe_customer_id,
          plan:     PRO_STRIPE_ID,
          quantity: @current_business.subscriptions.last.quantity
      }

      subscription_hash.merge!({ trial_end: @current_business.trial_end_at.to_time.to_i }) if @current_business.in_trial_period?
      LoggerExtension.stripe_log "SUBSCRIPTION_HASH: #{subscription_hash.inspect}"
      new_subscription = Stripe::Subscription.create(subscription_hash)
      LoggerExtension.stripe_log "STRIPE SUBSCRIPTION CREATED SUCCESSFULLY: #{new_subscription.inspect}"
    end

    def create_card(stripe_token)
      @customer = Stripe::Customer.retrieve(@current_business.stripe_customer_id)
      LoggerExtension.stripe_log "CUSTOMER WHOSE CARD IS TO BE ADDED #{customer.inspect}"
      card = @customer.sources.create(
        source: stripe_token
      )
      LoggerExtension.stripe_log "CUSTOMER CARD ADDED SUCCESSFULLY: #{card.inspect}"
      @customer.default_source = card.id
      @customer.save
      LoggerExtension.stripe_log "CUSTOMER CARD SUCCESSFULLY SET TO DEFAULT"
    end

    def create_customer_with_card(stripe_token)
      @customer = Stripe::Customer.create(
        email:  @current_business.owner.email,
        source: stripe_token
      )
      LoggerExtension.stripe_log "CUSTOMER CREATED SUCCESSFULLY WITH CARD: #{customer.inspect}"
      @current_business.update_column(:stripe_customer_id, @customer.id)
    end
end

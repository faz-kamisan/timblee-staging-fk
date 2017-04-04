class WebhookService
  class BusinessNotFound < StandardError
    def initialize(event)
      @event = event
    end

    def message
      "Business not found for stripe id - '#{@event.data.object.customer}' in the webhook"
    end
  end

  EVENTS = %w(charge.succeeded charge.refunded charge.failed customer.subscription.updated invoice.payment_failed)

  def initialize(event, params)
    @event = event
    @params = params
  end

  def perform
    return unless @event.type.in?(EVENTS)

    load_business

    LoggerExtension.stripe_log "Webhook Params:#{@params}\n\nEvent: #{@event.inspect}\n\nBusiness: #{@business.inspect}\n\n}"

    send(@event.type.gsub('.', '_'))
  rescue => e
    PaymentNotifier.delay.webhook_error(@params, @event, e.message)
  end

  private

    def load_business
      @business =  Business.find_by(stripe_customer_id: @event.data.object.customer)

      raise BusinessNotFound.new(@event) unless @business
    end

    def invoice_payment_failed
      lock_account
    end

    def charge_succeeded
      @business.update(has_plan: true, is_pro: true)
      LoggerExtension.stripe_log "PAYMENT SUCCESSFULL Business: #{@business.reload.inspect}\n\n"
      PaymentNotifier.delay.success(@business.owner, @event)
    end

    def charge_refunded
      PaymentNotifier.delay.refund(@business.owner, @event)
    end

    def charge_failed
      lock_account
      PaymentNotifier.delay.failure(@business.owner, @event)
    end

    def customer_subscription_updated
      renew_subscription if @event.data.object.quantity > 0
   end

   def lock_account
    @business.update(has_plan: false, is_pro: false)
    LoggerExtension.stripe_log "Card: #{@business.cards.last.inspect}\n\n"
    LoggerExtension.stripe_log "Account Locked due to failed payment. Business: #{@business.inspect}\n\n"

    StripePaymentService.new(@business).remove_old_subscription
   end


    def renew_subscription
      subscription = Subscription.where(stripe_subscriptions_id: @event.data.object.id).order(:created_at).last
      subscription.update_end_time(Time.at(@event.data.object.current_period_end))
      LoggerExtension.stripe_log "Subscription: #{subscription.inspect} end_at updated."
    end

end

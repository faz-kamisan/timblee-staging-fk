class WebhookService
  EVENTS = %w(charge.succeeded charge.refunded charge.failed customer.subscription.updated)

  def initialize(event, params)
    @event = event
    @params = params
  end

  def perform
    begin
      if @event.type.in?(EVENTS)
        send(@event.type.gsub('.', '_'))
      end
    rescue => e
      PaymentNotifier.delay.webhook_error(@params, @event, e.inspect)
    end
  end

  private

    def load_business
      @business =  Business.find_by(stripe_customer_id: @event.data.object.customer)
      if @business.present?
        LoggerExtension.stripe_log "Webhook Params:#{@params}\n\nEvent: #{@event.inspect}\n\nBusiness: #{@business.inspect}\n\n}"
       true
      else
        LoggerExtension.stripe_log "Webhook Error Business not found"
        PaymentNotifier.delay.webhook_error(@params, @event, nil)
        false
      end
    end

    def charge_succeeded
      PaymentNotifier.delay.success(@business.owner, @event) if load_business
    end

    def charge_refunded
      PaymentNotifier.delay.refund(@business.owner, @event) if load_business
    end

    def charge_failed
      PaymentNotifier.delay.failure(@business.owner, @event) if load_business
    end

    def customer_subscription_updated
      renew_subscription if load_business && @event.data.object.quantity > 0
   end


    def renew_subscription
      subscription = Subscription.where(stripe_subscriptions_id: @event.data.object.id).order(:created_at).last
      subscription.update_end_time(Time.at(@event.data.object.current_period_end))
      LoggerExtension.stripe_log "Subscription: #{subscription.inspect} end_at updated."
    end

end

require 'rails_helper'
require 'support/stripe_helper'

RSpec.describe StripePaymentService do

  let!(:business) { FactoryGirl.create(:business) }
  let!(:user) { business.owner }
  let!(:stripe_payment_service) { StripePaymentService.new(business) }

  describe '#add_card' do
    before do
      FakeWeb.register_uri(:post, "https://api.stripe.com/v1/customers", { body: CREATE_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
      FakeWeb.register_uri(:get, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
      FakeWeb.register_uri(:post, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
      FakeWeb.register_uri(:post, "https://api.stripe.com/v1/customers/xyz/sources", { body: CREATE_CARD_RESPONSE.to_json, status: ["200", "OK"]})
    end

    context 'stripe_customer_id of business is nil' do
      it "should return create stripe customer with card" do
        stripe_payment_service.add_card('123')
      end
    end
    context 'stripe_customer_id of business is not nil' do
      it "should return add stripe card for current business" do
        business.update(stripe_customer_id: 'xyz')
        stripe_payment_service.add_card('123')
        expect(Stripe::Customer.retrieve('xyz').default_source).to eq('card_1234')
      end
    end
  end

  describe '#remove_old_subscription' do
    context 'charge all remaining balance' do
      before do
        business.update(stripe_customer_id: 'xyz')
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:delete, "https://api.stripe.com/v1/subscriptions/sub_1234", { body: DELETE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/subscriptions/sub_1234", { body: UPDATE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/invoices/upcoming?customer=xyz", { body: FETCH_INVOICE_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/charges", { body: CREATE_CHARGE_RESPONSE.to_json, status: ["200", "OK"]})
      end

      it "should delete subscription" do
        stripe_payment_service.remove_old_subscription
      end
    end

    context 'refund rest balance' do
      before do
        business.update(stripe_customer_id: 'xyz')
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:delete, "https://api.stripe.com/v1/subscriptions/sub_1234", { body: DELETE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/subscriptions/sub_1234", { body: UPDATE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
      FakeWeb.register_uri(:get, "https://api.stripe.com/v1/invoices/upcoming?customer=xyz", { body: FETCH_INVOICE_RESPONSE_WITH_NEGATIVE_BALANCE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/charges?customer=xyz", { body: FETCH_CHARGES_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/refunds", { body: REFUND_CHARGE_RESPONSE.to_json, status: ["200", "OK"]})
      end

      it "should delete subscription" do
        stripe_payment_service.remove_old_subscription
      end
    end
  end

  describe '#update_subscription' do
    context 'update stripe subscription' do
      before do
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/subscriptions", { body: CREATE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/subscriptions/sub_1234", { body: UPDATE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        business.update(stripe_customer_id: 'xyz')
        business.set_new_subscription(['xyz@gmail.com'])
        stripe_payment_service.update_subscription
      end

      it { expect(business.reload.current_subscription.persisted?).to eq(true) }
      it { expect(business.is_pro).to eq(true) }
      it { expect(business.current_subscription.quantity).to eq(19) }
    end

    context 'create stripe subscription' do
      before do
        FakeWeb.register_uri(:get, "https://api.stripe.com/v1/customers/xyz", { body: FETCH_CUSTOMER_RESPONSE_WITHOUT_SUBSCRIPTION.to_json, status: ["200", "OK"]})
        FakeWeb.register_uri(:post, "https://api.stripe.com/v1/subscriptions", { body: CREATE_SUBSCRIPTION_RESPONSE.to_json, status: ["200", "OK"] })
        business.update(stripe_customer_id: 'xyz')
        business.set_new_subscription(['xyz@gmail.com', 'abc@gmail.com'])
        stripe_payment_service.update_subscription
      end

      it { expect(business.reload.current_subscription.persisted?).to eq(true) }
      it { expect(business.is_pro).to eq(true) }
      it { expect(business.current_subscription.quantity).to eq(31) }
      it { expect(business.current_subscription.stripe_subscriptions_id).to eq('sub_1234') }
    end
  end
end

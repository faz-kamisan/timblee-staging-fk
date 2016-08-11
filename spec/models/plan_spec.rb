require 'rails_helper'
RSpec.describe Plan, type: :model do

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:stripe_plan_id) }
    it { is_expected.to validate_presence_of(:cost_in_cents) }
  end

  describe 'Associations' do
    it { is_expected.to have_many(:subscriptions).dependent(:nullify) }
  end
end

require 'rails_helper'
RSpec.describe Subscription, type: :model do

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:start_date) }
    it { is_expected.to validate_presence_of(:end_date) }
    it { is_expected.to validate_presence_of(:quantity) }
    it { is_expected.to validate_presence_of(:plan) }
    it { is_expected.to validate_presence_of(:business) }
  end

  describe 'Associations' do
    it { is_expected.to belong_to(:plan) }
    it { is_expected.to belong_to(:business) }
  end
end

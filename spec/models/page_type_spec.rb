require 'rails_helper'
RSpec.describe PageType, type: :model do

  describe 'Associations' do
    it { is_expected.to have_many(:pages).dependent(:restrict_with_error) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

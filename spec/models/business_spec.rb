require 'rails_helper'
RSpec.describe Business, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:owner).class_name(User) }
    it { is_expected.to have_many(:users).dependent(:destroy) }
    it { is_expected.to have_many(:folders).dependent(:destroy) }
    it { is_expected.to have_many(:sitemaps).dependent(:destroy) }
  end
end

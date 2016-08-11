require 'rails_helper'
RSpec.describe Folder, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:sitemaps).dependent(:destroy) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:business_id) }
  end

  describe 'Callbacks' do
    it { is_expected.to callback(:check_name_is_not_all_sitemaps).before(:validation) }
  end

  describe 'Instance Methods' do
    let!(:folder) { FactoryGirl.build :folder, name: 'all sitemaps' }
    describe '#check_name_is_not_all_sitemaps' do
      before { folder.send :check_name_is_not_all_sitemaps }
      it { expect(folder.errors[:name]).to eq ['has already been taken'] }
    end
  end
end

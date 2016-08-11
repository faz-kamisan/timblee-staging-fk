require 'rails_helper'
RSpec.describe User, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:sitemap_invites).dependent(:destroy) }
    it { is_expected.to have_many(:shared_sitemaps).through(:sitemap_invites).source(:sitemap) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:full_name).with_message('Hmm... no name? Make something up :)') }
  end

  describe 'Callbacks' do
    it { is_expected.to callback(:add_business).before(:create) }
    it { is_expected.to callback(:set_is_admin).before(:create) }
    it { is_expected.to callback(:set_confirmation_instructions_to_be_sent).after(:create) }
    it { is_expected.to callback(:restrict_owner_destroy).before(:destroy) }
    it { is_expected.to callback(:restrict_owner_role_update).before(:update) }
  end

  describe 'Instance Methods' do
    let!(:user) { FactoryGirl.create :user }
    let!(:sitemap_1) { FactoryGirl.create :sitemap, name: 'Site Map 1', business: user.business }
    let!(:sitemap_2) { FactoryGirl.create :sitemap, name: 'Site Map 2', business: user.business }
    let!(:sitemap_3) { FactoryGirl.create :sitemap, name: 'Site Map 3', business: user.business }

    describe '#all_sitemaps' do
      it { expect(user.all_sitemaps).to eq [sitemap_1, sitemap_2, sitemap_3] }
    end

    describe '#add_business' do
      before do
        @previous_business = user.business.destroy
        user.send :add_business
      end
      it { expect(user.business.id).not_to eq @previous_business.id }
    end
  end
end

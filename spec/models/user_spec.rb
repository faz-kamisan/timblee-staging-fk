require 'rails_helper'
RSpec.describe User, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:site_map_invites).dependent(:destroy) }
    it { is_expected.to have_many(:shared_site_maps).through(:site_map_invites).source(:site_map) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:full_name) }
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
    let!(:site_map_1) { FactoryGirl.create :site_map, name: 'Site Map 1', business: user.business }
    let!(:site_map_2) { FactoryGirl.create :site_map, name: 'Site Map 2', business: user.business }
    let!(:site_map_3) { FactoryGirl.create :site_map, name: 'Site Map 3', business: user.business }

    describe '#all_site_maps' do
      it { expect(user.all_site_maps).to eq [site_map_1, site_map_2, site_map_3] }
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

require 'rails_helper'
RSpec.describe SiteMap, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:folder) }
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:site_map_invites).dependent(:destroy) }
    it { is_expected.to have_many(:invited_users).through(:site_map_invites).source(:user) }
    it { is_expected.to have_many(:pages).dependent(:destroy) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:business) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:business_id) }
  end

  describe 'Callbacks' do
    it { is_expected.to callback(:set_state_to_in_progress).before(:validation).on(:create) }
  end

  describe 'Scopes' do
    let!(:site_map_1) { FactoryGirl.create :site_map }
    let!(:site_map_2) { FactoryGirl.create :site_map }
    let!(:site_map_3) { FactoryGirl.create :site_map }
    let!(:site_map_4) { FactoryGirl.create :site_map }
    before do
      site_map_2.update(state: 'on_hold')
      site_map_3.update(state: 'in_review')
      site_map_4.update(state: 'approved')
    end
    describe 'on_hold' do
      it { expect(SiteMap.on_hold).to eq [site_map_2] }
    end
    describe 'in_progress' do
      it { expect(SiteMap.in_progress).to eq [site_map_1] }
    end
    describe 'in_review' do
      it { expect(SiteMap.in_review).to eq [site_map_3] }
    end
    describe 'approved' do
      it { expect(SiteMap.approved).to eq [site_map_4] }
    end
  end

  describe 'Instance Methods' do
    let!(:site_map) { FactoryGirl.build :site_map, name: '    test    ' }
  end
end

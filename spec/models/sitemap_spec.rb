require 'rails_helper'
RSpec.describe Sitemap, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:folder) }
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:sitemap_invites).dependent(:destroy) }
    it { is_expected.to have_many(:invited_users).through(:sitemap_invites).source(:user) }
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
    let!(:sitemap_1) { FactoryGirl.create :sitemap }
    let!(:sitemap_2) { FactoryGirl.create :sitemap }
    let!(:sitemap_3) { FactoryGirl.create :sitemap }
    let!(:sitemap_4) { FactoryGirl.create :sitemap }
    before do
      sitemap_2.update(state: 'on_hold')
      sitemap_3.update(state: 'in_review')
      sitemap_4.update(state: 'approved')
    end
    describe 'on_hold' do
      it { expect(Sitemap.on_hold).to eq [sitemap_2] }
    end
    describe 'in_progress' do
      it { expect(Sitemap.in_progress).to eq [sitemap_1] }
    end
    describe 'in_review' do
      it { expect(Sitemap.in_review).to eq [sitemap_3] }
    end
    describe 'approved' do
      it { expect(Sitemap.approved).to eq [sitemap_4] }
    end
  end

  describe 'Instance Methods' do
    let!(:sitemap) { FactoryGirl.build :sitemap, name: '    test    ' }
  end
end

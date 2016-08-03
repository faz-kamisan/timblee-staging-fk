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
    it { is_expected.to callback(:format_name).before(:save) }
  end

  describe 'Instance Methods' do
    let!(:site_map) { FactoryGirl.build :site_map, name: '    test    ' }

    describe '#updated_at_formatted' do
      before { site_map.save }
      it { expect(site_map.updated_at_formatted).to eq site_map.updated_at.strftime('%b %d, %Y') }
    end

    describe '#format_name' do
      before { site_map.send :format_name }
      it { expect(site_map.name).to eq 'Test' }
    end
  end
end

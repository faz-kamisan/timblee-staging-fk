require 'rails_helper'
RSpec.describe Folder, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:business) }
    it { is_expected.to have_many(:site_maps).dependent(:destroy) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:business_id) }
  end

  describe 'Callbacks' do
    it { is_expected.to callback(:format_name).before(:save) }
  end

  describe 'Instance Methods' do
    let!(:folder) { FactoryGirl.build :folder, name: '    test    ' }
    describe '#format_name' do
      before { folder.send :format_name }
      it { expect(folder.name).to eq 'Test' }
    end
  end
end

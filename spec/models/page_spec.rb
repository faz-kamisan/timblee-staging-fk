require 'rails_helper'
RSpec.describe Page, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:site_map) }
    it { is_expected.to belong_to(:page_type) }
    it { is_expected.to belong_to(:parent).class_name(:Page) }
    it { is_expected.to have_many(:children).class_name(:Page).with_foreign_key(:parent_id).dependent(:destroy) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

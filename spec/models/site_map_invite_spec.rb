require 'rails_helper'
RSpec.describe SiteMapInvite, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:site_map) }
    it { is_expected.to belong_to(:user) }
  end
end

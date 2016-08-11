require 'rails_helper'
RSpec.describe SitemapInvite, type: :model do

  describe 'Associations' do
    it { is_expected.to belong_to(:sitemap) }
    it { is_expected.to belong_to(:user) }
  end
end

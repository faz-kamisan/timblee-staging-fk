class SiteMapInvite < ActiveRecord::Base
  belongs_to :site_map
  belongs_to :user
end

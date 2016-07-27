class SiteMap < ActiveRecord::Base
  belongs_to :folder
  belongs_to :business
  has_many :pages
  has_many :site_map_invites
  has_many :invited_users, through: :site_map_invites, source: :user

  validates :business, presence: true
  validates :name, uniqueness: { scope: :business_id }
end
class SiteMap < ActiveRecord::Base
  belongs_to :folder
  belongs_to :business
  has_many :pages, dependent: :destroy
  has_many :site_map_invites, dependent: :destroy
  has_many :invited_users, through: :site_map_invites, source: :user

  validates :business, presence: true
  validates :name, uniqueness: { scope: :business_id }

  def updated_at_formatted
    updated_at.strftime('%b %d, %Y')
  end
end


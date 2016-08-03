class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :site_maps, dependent: :destroy

  def invited_users
    users.where.not(invitation_token: nil)
  end


end

class Guest < ActiveRecord::Base
  validates :full_name, :email, presence: true
  has_many :comments, as: :commenter
  strip_fields :full_name, :email
end

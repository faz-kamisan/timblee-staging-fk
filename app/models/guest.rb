class Guest < ActiveRecord::Base
  validates :full_name, :email, presence: true
  validates :email, uniqueness: { message: I18n.t('devise.failure.invited') }, allow_blank: true
  has_many :comments, as: :commenter
  strip_fields :full_name, :email

  def first_name
    full_name.split(' ').first
  end
end

class Guest < ActiveRecord::Base
  validates :full_name, :email, presence: true
  validates :email, uniqueness: { message: I18n.t('devise.failure.invited') }, allow_blank: true

  has_many :comments, as: :commenter
  has_many :notifications, as: :recipient

  strip_fields :full_name, :email

  def first_name
    full_name.split(' ').first
  end

  def avatar_url
    '/assets/guest-icon.png'
  end

  def to_react_data
    {
      id: id,
      full_name: full_name,
      display: full_name,
      avatarUrl: avatar_url,
      email: email
    }
  end

end

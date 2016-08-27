class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :commenter, class_name: :User
  validates :message, :commentable, :commenter, presence: true
  strip_fields :message

  def to_react_data
    { id: id, message: message, commenter: { fullName: commenter.full_name, email: commenter.email } }
  end
end

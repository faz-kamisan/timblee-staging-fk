class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true, touch: true
  belongs_to :commenter, polymorphic: true
  validates :message, :commentable, :commenter, presence: true

  strip_fields :message

  scope :order_by_created_at, -> { order('created_at ASC') }

  def to_react_data
    { id: id, message: message, created_at: created_at_decorated, commenter: { fullName: commenter.full_name, email: commenter.email } }
  end

  def created_at_decorated
    diff_seconds = Time.current - created_at
    case diff_seconds
      when 1
        return "#{diff_seconds.to_i} second ago"
      when 0 .. 59
        return "#{diff_seconds.to_i} #{'second'.pluralize(diff_seconds.to_i)} ago"
      when 60 .. (3600-1)
        return "#{(diff_seconds/60).to_i} #{'minute'.pluralize((diff_seconds/60).to_i)} ago"
      when 3600 .. (3600*24-1)
        return "#{(diff_seconds/3600).to_i} #{'hour'.pluralize((diff_seconds/3600).to_i)} ago"
      when (3600*24) .. (3600*24*30)
        return "#{(diff_seconds/(3600*24)).to_i} #{'day'.pluralize((diff_seconds/(3600*24)).to_i)} ago"
      else
        return created_at.strftime('%d %b %Y')
    end
  end
end

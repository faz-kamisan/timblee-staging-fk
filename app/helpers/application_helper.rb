module ApplicationHelper

  def current_business
    current_user.try(:business)
  end

  def pretty_time(time)
    time.strftime('%d %b %Y')
  end
end

class NotificationsController < ApplicationController

  def load_more
    @has_more = current_user.notifications.count > params[:offset].to_i
    @more_notifications = @notifications.offset(params[:offset])
  end

end

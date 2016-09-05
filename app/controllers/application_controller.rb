class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include SettingsRoutesHelper

  protect_from_forgery with: :exception
  before_filter :authenticate_user!

  def current_business
    current_user.try(:business)
  end

  def after_sign_in_path_for(resource)
    if resource.is_super_admin?
      admin_dashboard_path
    else
      home_dashboard_path
    end
  end

  def after_sign_out_path_for(resource)
    new_user_session_path
  end

end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include SettingsRoutesHelper

  protect_from_forgery with: :exception

  before_filter :authenticate_user!, unless: :proxy_login?
  before_filter :load_notifications, :load_card, if: :current_user
  before_filter :lock_business_after_trial_end, if: :current_user

  def current_user_with_proxy_login
    current_proxy_user || current_user_without_proxy_login
  end
  alias_method_chain :current_user, :proxy_login
  helper_method :current_user_with_proxy_login,
                :current_user_without_proxy_login

  def current_business
    current_user.try(:business)
  end

  def after_sign_in_path_for(resource)
    home_dashboard_path
  end

  def after_sign_out_path_for(resource)
    new_user_session_path
  end

  def current_guest
    @guest_user ||= Guest.find_by(id: session[:guest_user_id]) if session[:guest_user_id]
  end

  def current_proxy_user
    @current_proxy_user ||= User.find_by(id: session[:proxy_user_id]) if session[:proxy_user_id]
  end
  helper_method :current_proxy_user

  def proxy_login?
    !!current_proxy_user
  end
  helper_method :proxy_login?

  def analytics
    @analytics ||= Analytics.new(current_user) if current_user
  end

  def load_card
    @card = current_business.active_card
  end

  def load_notifications
    @notifications = current_user.notifications.limit(15).order(created_at: :desc)
    @has_more = current_user.notifications.count > 15
  end

  def lock_business_after_trial_end
    if !current_user.is_super_admin? && current_business.account_locked?
      if request.xhr?.nil?
        redirect_to billing_settings_users_path, alert: t('account_locked', scope: :flash)
      else
        flash.now[:alert] = t('account_locked', scope: :flash)
        render 'shared/show_flash'
      end
    end
  end

end

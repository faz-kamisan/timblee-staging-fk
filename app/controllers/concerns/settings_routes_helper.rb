module SettingsRoutesHelper
  extend ActiveSupport::Concern

  included do
    helper_method :team_settings_users_path, :personalization_settings_users_path, :my_info_settings_users_path, :billing_settings_users_path
  end

  def team_settings_users_path
    settings_tab_users_path(tab: 'team')
  end

  def personalization_settings_users_path
    settings_tab_users_path(tab: 'personalization')
  end

  def my_info_settings_users_path
    settings_tab_users_path(tab: 'my-info')
  end

  def billing_settings_users_path
    settings_tab_users_path(tab: 'billing')
  end
end

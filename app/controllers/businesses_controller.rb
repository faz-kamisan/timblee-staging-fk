class BusinessesController < ApplicationController
  def send_destroy_request_to_superadmin
    BusinessMailer.delay.send_admin_account_destroy_request(current_business, current_user)
    redirect_to billing_settings_users_path, notice: 'Request send successfully'
  end
end

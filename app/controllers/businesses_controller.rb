class BusinessesController < ApplicationController
  def destroy
    BusinessMailer.delay.destroy_business(current_business, current_user)
    redirect_to billing_settings_users_path, notice: 'Request send successfully'
  end
end

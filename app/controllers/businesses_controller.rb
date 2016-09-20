class BusinessesController < ApplicationController

  before_filter :fetch_business, only: [:update]

  def send_destroy_request_to_superadmin
    BusinessMailer.delay.send_admin_account_destroy_request(current_business, current_user)
    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
  end

  def update
    if @business.update(business_params)
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:alert] = t('.failure', scope: :flash)
    end
    redirect_to personalization_settings_users_path
  end

  private

    def fetch_business
      unless @business = current_business
        flash[:alert] = t('.failure', scope: :flash)
        redirect_to personalization_settings_users_path
      end
    end

    def business_params
      params.require(:business).permit(:name, :logo)
    end

end

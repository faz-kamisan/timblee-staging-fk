class BusinessesController < ApplicationController

  skip_before_action :lock_business_after_trial_end, only: [:delete_account]
  before_filter :fetch_business, only: [:update]
  after_filter :track_user_custom_fields, only: [:update]

  def delete_account
    BusinessMailer.delay.send_admin_account_destroy_request(current_business, current_user)
    redirect_to billing_settings_users_path, notice: t('.success', scope: :flash)
  end

  def update
    @field = business_params.has_key?(:logo) ? 'logo' : 'name'
    @business.remove_logo! if business_params.has_key?(:logo) && !business_params[:logo].present?
    if @business.update(business_params)

      respond_to do |format|
        format.js do
          flash.now[:notice] = t('.success', scope: :flash)
        end
        format.html do
          flash[:notice] = t('.success', scope: :flash)
          redirect_to personalization_settings_users_path
        end
      end
    else

      respond_to do |format|
        format.js do
          flash[:alert] = t('.failure', scope: :flash)
        end
        format.html do
          flash[:alert] = t('.failure', scope: :flash)
          redirect_to personalization_settings_users_path
        end
      end

    end
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


class SuperAdmin::MainController < ApplicationController

  before_action :check_user_is_super_admin
  before_action :fetch_business, only: [:impersonate]

  def dashboard
    @businesses = Business.all.includes(:owner) - [current_user.business]
    @businesses = @businesses.sort_by {|business| business.name.present? ? business.name.downcase : business.owner.email.downcase }
  end

  def impersonate
    user = @business.owner
    sign_in(user, bypass: true)
    redirect_to root_path
  end

  private

    def check_user_is_super_admin
      unless current_user.is_super_admin
        redirect_to root_path, error: 'You have to be a super admin for this.'
      end
    end

    def fetch_business
      unless @business = Business.find_by(id: params[:business_id])
        redirect_to admin_dashboard_path, error: 'Business not found'
      end
    end
end

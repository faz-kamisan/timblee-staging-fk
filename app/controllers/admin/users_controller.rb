class Admin::UsersController < ApplicationController

  skip_before_action :lock_business_after_trial_end, only: [:destroy]
  before_filter :load_user, only: [:destroy, :edit, :update]
  before_filter :restrict_current_user, only: [:destroy]
  after_filter :track, only: [:destroy]
  def edit
  end

  def update
    prev_unconfirmed_email = @user.unconfirmed_email if @user.respond_to?(:unconfirmed_email)
    user_updated = @user.update_without_password(user_params)
    if user_updated
      @user.mail_user_about_role_update(current_user) if user_params.has_key?(:is_admin)
      if is_flashing_format?
        flash_key = update_needs_confirmation?(@user, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        flash[:notice] = t(".#{ flash_key }", scope: :flash)
      end
    else
      flash[:error] = t('.failure', scope: :flash)
    end
    redirect_to edit_admin_user_path(@user)
  end

  def destroy
    if @user.destroy
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = @user.errors[:base].join(',')
    end
    redirect_to team_settings_users_path
  end

  def send_reset_link
    user = User.send_reset_password_instructions(send_reset_link_params)
    if user.errors.any?
      flash.now[:error] = t('.failure', scope: :flash)
    else
      flash.now[:notice] = t('.success', scope: :flash)
    end
  end

  private

    def track
      analytics.track_pro_plan(Plan::PRO) if current_business.is_pro_plan? && @user.destroyed?
    end

    def restrict_current_user
      if current_user == @user
        flash[:error] = t('.self_destroy', scope: :flash)
        redirect_to home_dashboard_path
      end
    end

    def update_needs_confirmation?(resource, previous)
      resource.respond_to?(:pending_reconfirmation?) &&
        resource.pending_reconfirmation? &&
        previous != resource.unconfirmed_email
    end

    def user_params
      params.require(:user).permit(:full_name, :is_admin, :email)
    end

    def send_reset_link_params
      params.require(:user).permit(:email)
    end

    def load_user
      @user = ::User.find_by(id: params[:id])
      unless @user
        flash[:error] = t('.not_found', scope: :flash)
        redirect_to home_dashboard_path
      end
    end
end

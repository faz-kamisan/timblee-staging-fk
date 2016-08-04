class Admin::UsersController < ApplicationController

  before_filter :load_user, only: [:destroy, :edit, :update]

  def edit
  end

  def update
    if @user.update(user_params)
      flash.now[:notice] = t('.success', scope: :flash)
    else
      flash.now[:error] = t('.failure', scope: :flash)
    end
    redirect_to edit_admin_user_path(@user)
  end

  def destroy
    if @user.destroy
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = @user.errors[:base].join(',')
    end
    redirect_to settings_users_path
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

    def user_params
      params.require(:user).permit(:full_name, :is_admin)
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

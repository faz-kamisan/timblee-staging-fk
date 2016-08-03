class UsersController < ApplicationController

  before_filter :check_user_is_confirmed, only: [:update_password]
  before_filter :load_user, only: [:destroy]

  def settings
  end

  def update_password
      if current_user.update(password_update_params)
        sign_in current_user, :bypass => true
        redirect_to settings_users_path, notice: 'Password Updated'
      else
        redirect_to settings_users_path, alert: 'Could Not Update Password'
      end
  end

  def destroy
    if @user.destroy
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = @user.errors[:base].join(',')
    end
    redirect_to settings_users_path
  end

  private

    def password_update_params
      params.require(:user).permit(:password)
    end

    def load_user
      @user = User.find_by(id: params[:id])
      unless @user
        flash[:error] = t('.not_found', scope: :flash)
        redirect_to home_dashboard_path
      end
    end
end

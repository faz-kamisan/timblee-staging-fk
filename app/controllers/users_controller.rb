class UsersController < ApplicationController

  def settings
  end

  def update_password
      if current_user.update(password_update_params)
        sign_in current_user, :bypass => true
        redirect_to settings_users_path, notice: 'Password Updated'
      else
        render 'users/settings'
      end
  end

  private

    def password_update_params
      params.require(:user).permit(:password)
    end
end

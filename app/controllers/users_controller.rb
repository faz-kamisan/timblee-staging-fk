class UsersController < ApplicationController

  before_filter :check_user_is_confirmed, only: [:update_password]

  def settings
    if(current_business.stripe_customer_id)
      customer = Stripe::Customer.retrieve(current_business.stripe_customer_id)
      @card = customer.sources.retrieve(customer.default_source)
    end
  end

  def update_password
      if current_user.update(password_update_params)
        sign_in current_user, :bypass => true
        redirect_to settings_users_path, notice: 'Password Updated'
      else
        redirect_to settings_users_path, alert: 'Could Not Update Password'
      end
  end

  private

    def password_update_params
      params.require(:user).permit(:password)
    end
end

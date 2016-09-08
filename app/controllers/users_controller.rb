class UsersController < ApplicationController

  def settings
    if(current_business.stripe_customer_id)
      customer = Stripe::Customer.retrieve(current_business.stripe_customer_id)
      @card = current_business.active_card
    end
  end

  def progress
    @sitemaps = current_business.sitemaps.order(updated_at: :desc)
    @sitemaps_by_state = { on_hold: @sitemaps.select { |sitemap| sitemap.state == 'on_hold' },
                            in_progress: @sitemaps.select { |sitemap| sitemap.state == 'in_progress' },
                            review: @sitemaps.select { |sitemap| sitemap.state == 'review' },
                            approved: @sitemaps.select { |sitemap| sitemap.state == 'approved' }
                          }
  end

  def update_password
    if current_user.update(password_update_params)
      sign_in current_user, :bypass => true
      redirect_to settings_users_path, notice: 'Password Updated'
    else
      redirect_to settings_users_path, alert: 'Could Not Update Password'
    end
  end

  def update_avatar
    if params[:user]
      if current_user.update(avatar_update_params)
        redirect_to settings_users_path, notice: 'Avatar Updated'
      else
        redirect_to settings_users_path, alert: 'Could Not Update Avatar'
      end
    else
      if params[:default_avatar] && current_user.avatar.store!(File.open(File.join(Rails.root, "app/assets/images/#{params[:default_avatar]}"))) && current_user.save!
        redirect_to settings_users_path, notice: 'Avatar Updated'
      else
        redirect_to settings_users_path, alert: 'No Avatar selected'
      end
    end
  end

  def validate_unique_email
        render :json => {
                            :existing_email => User.unscoped.find_by(email: params[:email]).present?
                        }
  end

  private

    def password_update_params
      params.require(:user).permit(:password)
    end

    def avatar_update_params
      params.require(:user).permit(:avatar)
    end
end

class UsersController < ApplicationController

  def settings
    if(current_business.stripe_customer_id)
      customer = Stripe::Customer.retrieve(current_business.stripe_customer_id)
      @card = customer.sources.retrieve(customer.default_source)
    end
  end

  def progress
    @sitemaps = current_business.sitemaps.order(updated_at: :desc)
    @sitemaps_by_state = { on_hold: @sitemaps.select { |sitemap| sitemap.state == 'on_hold' },
                            in_progress: @sitemaps.select { |sitemap| sitemap.state == 'in_progress' },
                            in_review: @sitemaps.select { |sitemap| sitemap.state == 'in_review' },
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

  private

    def password_update_params
      params.require(:user).permit(:password)
    end
end

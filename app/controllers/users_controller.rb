class UsersController < ApplicationController
  skip_before_action :lock_business_after_trial_end, only: [:settings]

  def settings
    @current_tab = params[:tab] || 'my-info'
    flash[:alert] ||= t('account_locked', scope: :flash, free_sitemaps_count_in_words: current_business.free_sitemaps_count_in_words) if @current_tab == 'billing' && current_business.account_locked?

    if(current_business.stripe_customer_id)
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
      redirect_to settings_users_path, notice: t('.success', scope: :flash)
    else
      redirect_to settings_users_path, alert: t('.failure', scope: :flash)
    end
  end

  def update_avatar
    if params[:user]
      if current_user.update(avatar_update_params)
        redirect_to settings_users_path, notice: t('.success', scope: :flash)
      else
        Rails.logger.info "#{current_user.errors.full_messages}"
        redirect_to settings_users_path, alert: current_user.errors.messages.values.join(',').presence || t('.failure', scope: :flash)
      end
    else
      if params[:default_avatar] && current_user.avatar.store!(File.open(File.join(Rails.root, "app/assets/images/avatars/#{params[:default_avatar]}.png"))) && current_user.save!
        redirect_to settings_users_path, notice: t('.success', scope: :flash)
      else
        redirect_to settings_users_path, alert: current_user.errors.messages.values.join(',').presence || t('.failure', scope: :flash)
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

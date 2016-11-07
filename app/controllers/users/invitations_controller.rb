class Users::InvitationsController < Devise::InvitationsController
  skip_before_action :lock_business_after_trial_end, only: [:revoke]
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :load_user, only: [:re_invite, :revoke]
  after_filter :track_revoke, only: [:revoke]

  def bulk_invitation
    emails = params[:email].split(/\s* \s*/)
    @email_categories = InvitationService.invite_users(emails, current_user, params[:custom_message])
    set_notice
    redirect_path = request.referrer || team_settings_users_path
    redirect_to redirect_path
  end

  def re_invite
    if @user.active?
      flash.now[:error] = t('.failure', scope: :flash)
    else
      flash.now[:notice] = t('.success', scope: :flash)
      @user.send :generate_invitation_token!
      InviteMailer.delay.send_invite(@user.id, @user.raw_invitation_token, '')
    end
  end

  def revoke
    if (@user.really_destroy! unless @user.active?)
      flash.now[:notice] = t('.success', scope: :flash)
    else
      flash.now[:error] = t('.failure', scope: :flash)
    end
  end

protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:accept_invitation).concat [:full_name]
  end

  def load_user
    @user = User.find_by(id: params[:id])
    unless @user
      render json: { error: t('.not_found', scope: :flash) }, status: :not_found
    end
  end

  def set_notice
    if @email_categories[:invitable_emails].present?
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:alert] = t('.failure', scope: :flash)
    end
  end

  private

    def track_revoke
      analytics.track_pro_plan(Plan::PRO) if current_business.is_pro_plan? && @user.destroyed?
    end

    def after_accept_path_for(resource)
      home_intro_path
    end
end

class Users::InvitationsController < Devise::InvitationsController
before_filter :configure_permitted_parameters, if: :devise_controller?
before_filter :load_user, only: [:re_invite, :revoke]

  def bulk_invitation
    emails = params[:email].split(/\s* \s*/)
    @email_categories = InvitationService.invite_users(emails, current_user, params[:custom_message])
    set_notice
    redirect_to team_settings_users_path
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
      analytics.track_pro_plan('Pro') if current_business.is_pro_plan?
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
    flash[:notice] = ''
    flash[:notice] = t('.success', scope: :flash, emails: @email_categories[:invitable_emails].join(', ')) if @email_categories[:invitable_emails].present?
    invalid_emails = @email_categories[:already_signed_up_user_emails] + @email_categories[:invalid_emails]
    flash[:notice] += t('.failure', scope: :flash, emails: invalid_emails.join(', ')) if invalid_emails.present?
  end

  private

    def after_accept_path_for(resource)
      resource.confirm!
      home_intro_path
    end
end

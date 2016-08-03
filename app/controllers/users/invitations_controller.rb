class Users::InvitationsController < Devise::InvitationsController
before_filter :configure_permitted_parameters, if: :devise_controller?
before_filter :load_user, only: [:re_invite, :revoke]

  def bulk_invitation
    valid_emails = []

    emails = params[:email].split(/\s* \s*/)
    emails.each do |email|

      unless User.find_by(email: email)
        user = User.invite!({email: email, business: current_business, skip_invitation: true}, current_user)
        if user.persisted?
          InviteMailer.delay.send_invite(user.id, user.raw_invitation_token, params[:custom_message])
          valid_emails << email unless user.errors[:email].present?
        end
      end
    end

    invalid_emails = emails - valid_emails
    set_notice(valid_emails, invalid_emails)
    redirect_to settings_users_path
  end

  def re_invite
    if @user.active?
      flash.now[:error] = t('.failure', scope: :flash)
    else
      flash.now[:notice] = t('.success', scope: :flash)
      @user.invite!
    end
  end

  def revoke
    if (@user.destroy unless @user.active?)
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

  def set_notice(valid_emails, invalid_emails)
    flash[:notice] = ''
    flash[:notice] = t('.success', scope: :flash, emails: valid_emails.join(', ')) if valid_emails.present?
    flash[:notice] += t('.failure', scope: :flash, emails: invalid_emails.join(', ')) if invalid_emails.present?
  end
end

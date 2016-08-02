class Users::InvitationsController < Devise::InvitationsController
before_filter :configure_permitted_parameters, if: :devise_controller?

  def bulk_invitation
    valid_emails = []

    emails = params[:email].split(/\s* \s*/)
    emails.each do |email|

      unless User.find_by(email: email)
        user = User.invite!({email: email, business: current_business}, current_user)
        user.valid?
        valid_emails << email unless user.errors[:email].present?
      end
    end

    invalid_emails = emails - valid_emails
    set_notice(valid_emails, invalid_emails)
    redirect_to home_dashboard_path
  end

protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:accept_invitation).concat [:full_name]
  end

  def set_notice(valid_emails, invalid_emails)
    flash[:notice] = ''
    flash[:notice] = t('.success', scope: :flash, emails: valid_emails.join(',')) if valid_emails.present?
    flash[:notice] += t('.failure', scope: :flash, emails: invalid_emails.join(',')) if invalid_emails.present?
  end
end

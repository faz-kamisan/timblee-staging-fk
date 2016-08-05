class Businesses_Controller < ApplicationController
  def bulk_invitation
    #fix - move to model + optimize it. Discuss.(done)
    emails = params[:email].split(/\s* \s*/)
    email_categories = InvitationService.invite_users(emails, current_user, params[:custom_message])
    set_notice(email_categories)
    redirect_to team_settings_users_path
  end
end

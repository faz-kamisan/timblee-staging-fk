class Users::PasswordsController < Devise::PasswordsController
  before_action :restrict_users_with_invitation_not_accepted, only: :create
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  # def create
  #   super
  # end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
    new_user_session_path(modal: true, email: resource.email)
  end

  def restrict_users_with_invitation_not_accepted
    user = User.find_by_email(params[:user][:email])
    if user && user.invitation_not_accepted?
      redirect_to root_path, alert: t('devise.failure.invited')
    end
  end

end

class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      set_flash_message(:notice, :confirmed) if is_flashing_format?
      respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
    else
      redirect_to new_user_session_path, alert: t('.confirmation_token_invalid', scope: :flash)
    end
  end

  def after_resending_confirmation_instructions_path_for(user)
    if current_user
      settings_users_path
    else
      new_user_session_path
    end
  end
end

class Users::RegistrationsController < Devise::RegistrationsController
before_filter :configure_sign_up_params, only: [:create]
before_filter :configure_account_update_params, only: [:update]

  # PUT /resource
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
    debugger
    resource_updated = resource.update_without_password(account_update_params)
    yield resource if block_given?
    if resource_updated
      if is_flashing_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, bypass: true
      respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      render 'users/settings'
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << :full_name
  end

  def configure_account_update_params
    devise_parameter_sanitizer.for(:account_update) << :full_name
  end

  def after_update_path_for(resource)
    settings_users_path
  end
end

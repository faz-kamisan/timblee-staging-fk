class Users::SessionsController < Devise::SessionsController

  before_action :redirect_to_dashboard_if_login
  skip_before_action :lock_business_after_trial_end, only: [:create, :destroy]
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?
    session[:guest_user_id] = nil
    if(session[:sitemap_id])
      if(sitemap = Sitemap.find_by(id: session[:sitemap_id]))
        sitemap.update(business_id: resource.business, trial: false)
      end
      session[:sitemap_id] = nil
    end
    respond_with resource, location: after_sign_in_path_for(resource)
  end

  private

  def redirect_to_dashboard_if_login
    redirect_to after_sign_in_path_for(resource) if user_signed_in?
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end

class Users::RegistrationsController < Devise::RegistrationsController
  before_filter :configure_sign_up_params, only: [:create]
  before_filter :check_user_is_confirmed, only: [:update]
  before_filter :configure_account_update_params, only: [:update]

  # POST /
  def create
    build_resource(sign_up_params)
    resource.trial_days = params[:trial_days]
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if(session[:sitemap_id] && sitemap = Sitemap.find_by(id: session[:sitemap_id]))
        sitemap.update(business_id: resource.business_id, trial: false)
        session[:sitemap_id] = nil
      end
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        respond_to do |format|
          format.html do
            respond_with resource, location: after_sign_up_path_for(resource)
          end
          format.json do
            render json: resource.as_json, status: 200
          end
        end
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        respond_to do |format|
          format.html do
            respond_with resource, location: after_inactive_sign_up_path_for(resource)
          end
          format.json do
            render json: resource.as_json, status: 200
          end
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_to do |format|
        format.html do
          respond_with resource
        end
        format.json do
          render json: resource.errors, status: 422
        end
      end
    end
  end

  # PUT /resource
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    debugger
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
    resource_updated = resource.update_without_password(account_update_params)
    yield resource if block_given?
    if resource_updated
      sign_in resource_name, resource, bypass: true
      respond_to do |format|
        format.html do
          if is_flashing_format?
            flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
              :update_needs_confirmation : :updated
            set_flash_message :notice, flash_key
          end
          respond_with resource, location: after_update_path_for(resource)
        end
        format.js do
          flash.now[:notice] = 'Account Updated'
          render 'shared/show_flash.js'
        end
      end
    else
      clean_up_passwords resource
      respond_to do |format|
        format.html { redirect_to settings_users_path, alert: resource.errors.messages.values.join(',').presence || 'Could Not Update Account' }
        format.js do
          flash.now[:alert] = resource.errors.messages.values.join(' ').presence || 'Could Not Update Account'
          render 'shared/show_flash.js'
        end
      end
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << :full_name
  end

  def configure_account_update_params
    devise_parameter_sanitizer.for(:account_update) << :full_name
    devise_parameter_sanitizer.for(:account_update) << :avatar
    devise_parameter_sanitizer.for(:account_update) << :notify_by_email
  end

  def after_update_path_for(resource)
    settings_users_path
  end

  def check_user_is_confirmed
    if !current_user.confirmed? && params[:user][:email].present?
      redirect_to settings_users_path, alert: 'Need to verify email before updating'
    end
  end

  private

    def after_sign_up_path_for(resource)
      home_intro_path
    end
end

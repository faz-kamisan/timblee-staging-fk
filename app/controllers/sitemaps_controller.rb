class SitemapsController < ApplicationController
  skip_before_action :lock_business_after_trial_end, only: [:destroy]
  before_filter :fetch_sitemap, only: [:destroy, :show, :update, :share_via_email]
  before_filter :fetch_sitemap_from_token, only: [:public_share]
  skip_before_filter :authenticate_user!, only: [:public_share, :trial]
  before_filter :fetch_sitemap_from_sitemap_id, only: [:rename, :duplicate]
  around_action :wrap_in_transaction, only: :duplicate
  after_filter :track_user_custom_fields, only: [:create, :update, :rename, :duplicate, :destroy]

  layout 'shared_view', only: :public_share

  def create
    @sitemap = current_business.sitemaps.build(sitemap_params)
    @sitemap.business = current_business
    if @sitemap.save
      flash[:new_sitemap] = true
      redirect_to sitemap_path(@sitemap)
    else
      flash[:error] = t('.failure', scope: :flash)
      redirect_to home_dashboard_path
    end
  end

  def trial
    if(current_user)
      redirect_to home_dashboard_path, notice: 'You are already signed in.'
    else
      unless(session[:sitemap_id] && (@sitemap = Sitemap.find_by(id: session[:sitemap_id])))
        @sitemap = Sitemap.create(trial: true)
        session[:sitemap_id] = @sitemap.id
        TrialSitemapDestroyer.perform_in(Sitemap::TRIAL_SITEMAP_TTL, @sitemap.id)
      end
      @sitemap_props = @sitemap.to_react_data.merge!(publicShare: false)
      if current_user
        @sitemap_props.merge!(currentUser: { fullName: current_user.full_name, email: current_user.email })
      end
      render :show
    end
  end

  def show
    @sitemap_props = @sitemap.to_react_data.merge!(currentUser: { fullName: current_user.full_name,
                                                   email: current_user.email,
                                                   avatar: current_user.avatar,
                                                   isAdmin: current_user.is_admin? },
                                                   publicShareUrl: @sitemap.public_share_url,
                                                   publicShare: false,
                                                   newSitemap: !!flash[:new_sitemap])

    if(current_business.stripe_customer_id)
      @card = current_business.active_card
    end
  end

  def public_share
    @sitemap_props = @sitemap.to_react_data.merge(publicShare: true)
    if current_user
      @sitemap_props = @sitemap_props.merge!(currentUser: { fullName: current_user.full_name, email: current_user.email })
    elsif current_guest
      @sitemap_props = @sitemap_props.merge!(currentGuest: { fullName: current_guest.full_name, email: current_guest.email })
    end
  end

  def share_via_email
    emails = params[:emails].split(' ')
    SitemapShareService.share_sitemap(emails, current_user, @sitemap, params[:custom_message])
    flash.now.notice = "Email(s) were sent successfully"
  end

  def destroy
    if @sitemap.destroy
      Notification.generate(kind: :delete_sitemap, sitemap: @sitemap, actor: current_user)
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = t('.failure', scope: :flash)
    end
    redirect_to home_dashboard_path
  end

  def update
    if @sitemap.update(sitemap_params)
      Notification.generate(kind: :update_sitemap_status, sitemap: @sitemap, actor: current_user) if sitemap_params.has_key?('state')
      flash_message = sitemap_params.include?(:folder_id) ? t('.folder', scope: :flash, sitemap_name: @sitemap.name, folder_name: @sitemap.folder.try(:name) || 'All Sitemaps') : t('.success', scope: :flash)
      respond_to do |format|
        format.js do
          flash.now[:success] = flash_message
          render 'shared/show_flash'
        end
        format.json do
          render json: { success: flash_message }, status: 200
        end
      end
    else
      flash_message = sitemap_params.include?(:name) ? set_flash_message_for_rename_failure : t('.failure', scope: :flash)
      respond_to do |format|
        format.js do
          flash.now[:alert] = flash_message
          render 'shared/show_flash', status: 422
        end
        format.json do
          render json: flash_message , status: 422
        end
      end
    end
  end

  def rename
    if @sitemap.update(rename_params)
      respond_to do |format|
        format.js do
          unless(params[:dont_show_flash])
            flash.now[:success] = t('.success', scope: :flash)
          end
        end
        format.json do
          render json: @sitemap.as_json, status: 200
        end
      end
    else
      respond_to do |format|
        format.js do
          flash.now[:alert] = set_flash_message_for_rename_failure
        end
        format.json do
          render json: t('.sitemaps.rename.failure', scope: :flash), status: 422
        end
      end
    end
  end

  def duplicate
    @duplicate = @sitemap.duplicate
    if @duplicate.persisted?
      flash.now[:success] = t('.success', scope: :flash)
    else
      flash.now[:alert] = @duplicate.errors.full_messages.try(:join, ' ') || t('.failure', scope: :flash)
      render 'shared/show_flash'
    end
  end

  private

    def set_flash_message_for_rename_failure
      if @sitemap.name.present?
        t('sitemaps.rename.failure', scope: :flash)
      else
        t('sitemaps.rename.blank', scope: :flash)
      end
    end

    def fetch_sitemap
      unless @sitemap = current_business.sitemaps.find_by(id: params[:id])
        respond_to do |format|
          format.js do
            flash.now[:alert] = t('sitemaps.not_found', scope: :flash)
            render 'shared/show_flash'
          end
          format.html do
            flash[:alert] = t('sitemaps.not_found', scope: :flash)
            redirect_to home_dashboard_path
          end
        end
      end
    end

    def fetch_sitemap_from_sitemap_id
      unless @sitemap = current_business.sitemaps.find_by(id: params[:sitemap_id])
        flash.now[:alert] = t('sitemaps.not_found', scope: :flash)
      end
    end

    def fetch_sitemap_from_token
      unless @sitemap = Sitemap.find_by(public_share_token: params[:token])
        redirect_to root_path, alert: 'The share token is invalid'
      end
    end

    def sitemap_params
      params.require(:sitemap).permit(:name, :folder_id, :state, :position)
    end

    def rename_params
      params.require(:sitemap).permit(:name)
    end

    def wrap_in_transaction
      begin
        ActiveRecord::Base.transaction do
          yield
        end
      rescue
        flash.now[:alert] = t('.failure', scope: :flash)
      end
    end
end

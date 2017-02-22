require 'rubygems'
require 'zip'
class SitemapsController < ApplicationController


  skip_before_action :lock_business_after_trial_end, only: [:destroy]
  before_filter :fetch_sitemap, only: [:destroy, :show, :update, :share_via_email, :generate_pdf, :download_pdf, :download_png, :preview, :preview_png, :generate_png]
  before_filter :fetch_sitemap_from_token, only: [:public_share]
  skip_before_filter :authenticate_user!, only: [:public_share, :trial]
  before_filter :fetch_sitemap_from_sitemap_id, only: [:rename, :duplicate]
  around_action :wrap_in_transaction, only: [:duplicate, :generate_pdf, :download_pdf, :download_png, :generate_png]
  after_filter :track_user_custom_fields, only: [:create, :update, :rename, :duplicate, :destroy]

  layout 'shared_view', only: :public_share

  def create
    @sitemap = current_business.sitemaps.build(sitemap_params)
    @sitemap.user = current_user
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
    flash.now.notice = "We've emailed the link :)"
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
          render json: t('.failure', scope: :flash), status: 422
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


  def generate_png
    LoggerExtension.export_highlight
    LoggerExtension.export_log "Params:#{params}\n\n Sitemap:#{@sitemap.inspect}\n\n"
    @zoom = {}
    delete_file("#{Rails.root}/tmp/pngs/#{@sitemap.name}.zip")

    section_count = @sitemap.sections.count
    Zip::File.open("tmp/pngs/#{@sitemap.name}.zip", Zip::File::CREATE) do |zipfile|
      @sitemap.sections.order(:id).each_with_index do |section, index|
        html  = render_to_string(layout: 'png', locals: {section: section})
        if section.default? && section.level_one_pages < @sitemap.footer_pages.where.not(state: :archived).count
          level_one_pages_screen_count = @sitemap.footer_pages.where.not(state: :archived).count
        else
          level_one_pages_screen_count = section.level_one_pages
        end
        kit = IMGKit.new(html, width: (ExportService.calculate_width(level_one_pages_screen_count) + 200), quality: 89)
        file = kit.to_file("tmp/pngs/#{@sitemap.id}-#{index}.png")
        zipfile.add("#{@sitemap.name.gsub(':', '-')} - #{index + 1} of #{section_count}.png",  "#{Rails.root}/tmp/pngs/#{@sitemap.id}-#{index}.png"){true}
      end
    end
    LoggerExtension.export_log "Zip file created\n\n"
    LoggerExtension.export_highlight
    render nothing: true
  end

  def download_png
    LoggerExtension.export_highlight

    send_file "#{Rails.root}/tmp/pngs/#{@sitemap.name}.zip",
      :type => "application/zip",
      :disposition => 'attachment',
      :file_name => "#{@sitemap.name}.zip"
    LoggerExtension.export_log "Zip file sent\n\n"
    LoggerExtension.export_highlight
  end

  def generate_pdf
    LoggerExtension.export_highlight
    delete_file("#{Rails.root}/tmp/pdfs/#{@sitemap.name}-#{@page_size}.pdf")
    LoggerExtension.export_log "Params:#{params}\n\n Sitemap:#{@sitemap.inspect}\n\n"
    calculate_zoom_and_width
    LoggerExtension.export_log "Zoom:#{@zoom}\n\n Width:#{@width}\n\n Page-Size:#{@page_size}\n\n"
    html  = render_to_string(layout: 'pdf')
    LoggerExtension.export_log "Pdf page rendered\n\n"
    kit = PDFKit.new(html, page_size: @page_size, 'footer-html':  "#{root_url}/footer")
    LoggerExtension.export_log "Pdf initialized\n\n"
    kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/canvas_export.scss"
    LoggerExtension.export_log "Pdf css added\n\n"
    file = kit.to_file("tmp/pdfs/#{@sitemap.name}-#{@page_size}.pdf")
    LoggerExtension.export_log "Pdf file created\n\n"
    LoggerExtension.export_highlight
    render nothing: true
  end

  def download_pdf
    @page_size = params[:page_size].presence || 'A4'
    LoggerExtension.export_highlight

    send_file "#{Rails.root}/tmp/pdfs/#{@sitemap.name}-#{@page_size}.pdf",
      :type => "application/pdf",
      :disposition => 'attachment',
      :file_name => "#{@sitemap.name}-#{@page_size}.pdf"
    LoggerExtension.export_log "Pdf file sent\n\n"
    LoggerExtension.export_highlight

  end

  def preview
    calculate_zoom_and_width
    render layout: 'pdf', action: :generate_pdf
  end
  def preview_png
    @zoom = {}
    render layout: 'png', action: :generate_png, locals:{ section: @sitemap.sections.order(:id).to_a[params[:section].to_i || 0]}
  end

  private

    def delete_file(file_path)
      if File.exist?(file_path)
        File.delete(file_path)
        LoggerExtension.export_log "file deleted\n\n"
      end
    end

    def calculate_zoom_and_width
      @width, @zoom = {}, {}
      @sitemap.sections.map{|section| @width[section.id] = ExportService.calculate_width(section.level_one_pages)}
      @page_size = params[:page_size].presence || 'A4'
      @sitemap.sections.map{|section| @zoom[section.id] = ExportService.calculate_zoom(@page_size ,section.level_one_pages)}
      @footer_pages_count = @sitemap.footer_pages.where.not(state: :archived).count
      @width[:footer] = ExportService.calculate_width(@footer_pages_count)
      @zoom[:footer] = ExportService.calculate_zoom(@page_size ,@footer_pages_count)
    end

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
      rescue => e
        LoggerExtension.export_log "Exception Transaction Rollback : #{e.inspect}"
        if request.xhr?
          flash.now[:alert] = t('.failure', scope: :flash)
          render status: 422
        else
          flash[:alert] = t('.failure', scope: :flash)
          redirect_to home_dashboard_path
        end
      end
    end
end

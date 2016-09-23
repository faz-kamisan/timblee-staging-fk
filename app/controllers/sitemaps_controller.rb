class SitemapsController < ApplicationController
  before_filter :fetch_sitemap, only: [:destroy, :show, :update, :share_via_email]
  before_filter :fetch_sitemap_from_token, only: [:public_share]
  skip_before_filter :authenticate_user!, only: [:public_share]

  def create
    @sitemap = current_business.sitemaps.build(sitemap_params)
    @sitemap.business = current_business
    if @sitemap.save
      flash[:notice] = t('.success', scope: :flash)
      redirect_to sitemap_path(@sitemap)
    else
      flash[:error] = t('.failure', scope: :flash)
      redirect_to home_dashboard_path
    end
  end

  def show
    @sitemap_props = @sitemap.to_react_data.merge!(currentUser: { fullName: current_user.full_name,
                                                   email: current_user.email },
                                                   publicShareUrl: (sitemap_public_share_url(@sitemap.public_share_token).gsub(/(?<protocol>http(s?):\/\/)/, '\k<protocol>share.')),
                                                   publicShare: false)
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
    emails = params[:emails].split(',')
    SitemapShareService.share_sitemap(emails, current_user, @sitemap, params[:custom_message])
    render json: { success: 'Emails Sent Successfully' }, status: 200
  end

  def destroy
    if @sitemap.destroy
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = t('.failure', scope: :flash)
    end
    redirect_to home_dashboard_path
  end

  def update
    if @sitemap.update(sitemap_params)
      respond_to do |format|
        format.js do
          render 'shared/show_flash'
        end
        format.json do
          render json: { success: t('.success', scope: :flash) }, status: 200
        end
      end
    else
      respond_to do |format|
        format.js do
          flash.now[:alert] = t('.failure', scope: :flash)
          render 'shared/show_flash', status: 522
        end
        format.json do
          render json: t('.failure', scope: :flash) , status: 522
        end
      end
    end
  end


  private
    def fetch_sitemap
      unless @sitemap = current_business.sitemaps.find_by(id: params[:id])
        flash.now[:alert] = 'Sitemap Not Found'
        render 'shared/show_flash'
      end
    end

    def fetch_sitemap_from_token
      unless @sitemap = Sitemap.find_by(public_share_token: params[:token])
        redirect_to root_path, alert: 'The share token is invalid'
      end
    end

    def sitemap_params
      params.require(:sitemap).permit(:name, :folder_id, :state)
    end
end

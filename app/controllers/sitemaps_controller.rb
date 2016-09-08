class SitemapsController < ApplicationController
  before_filter :fetch_sitemap, only: [:destroy, :show, :update]
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
    @sitemap_props = @sitemap.to_react_data.merge!(currentUser: { fullName: current_user.full_name, email: current_user.email })
  end

  def public_share
    if current_user
      @sitemap_props = @sitemap.to_react_data.merge!(currentUser: { fullName: current_user.full_name, email: current_user.email })
    elsif current_guest
      @sitemap_props = @sitemap.to_react_data.merge!(currentGuest: { fullName: current_guest.full_name, email: current_guest.email })
    else
      @sitemap_props = @sitemap.to_react_data
    end
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

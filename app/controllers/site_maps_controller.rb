class SiteMapsController < ApplicationController
  before_filter :fetch_site_map, only: [:destroy, :show, :update]

  def create
    @site_map = current_business.site_maps.build(site_map_params)
    @site_map.business = current_business
    if @site_map.save
      flash[:notice] = t('.success', scope: :flash)
        redirect_to site_map_path(@site_map)
    else
      flash[:error] = t('.failure', scope: :flash)
      redirect_to home_dashboard_path
    end
  end

  def show
  end

  def destroy
    if @site_map.destroy
      flash[:notice] = t('.success', scope: :flash)
    else
      flash[:error] = t('.failure', scope: :flash)
    end
    redirect_to home_dashboard_path
  end

  def update
    if @site_map.update(site_map_params)
      flash.now[:notice] = t('.success', scope: :flash)
    else
      flash.now[:error] = t('.failure', scope: :flash)
    end
    render 'shared/show_flash'
  end

  private
    def fetch_site_map
      unless @site_map = current_business.site_maps.find_by(id: params[:id])
        flash.now[:alert] = 'SiteMap Not Found'
        render 'shared/show_flash'
      end
    end

    def site_map_params
      params.require(:site_map).permit(:name, :folder_id, :state)
    end
end

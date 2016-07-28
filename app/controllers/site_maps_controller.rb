class SiteMapsController < ApplicationController
  before_filter :authenticate_user!, only: [:create]
  before_filter :fetch_site_map, only: [:destroy, :show]

  def create
    @site_map = current_user.business.site_maps.build(site_map_params)
    @site_map.business = current_business
    if @site_map.save
      flash[:notice] = 'site_map created successfully'
        redirect_to site_map_path(@site_map)
    else
      flash[:error] = 'Couldn\'t create site_map'
        redirect_to root_path
    end
  end

  def show

  end

  def destroy
    @site_map.destroy
  end

  private
    def fetch_site_map
      unless @site_map = current_business.site_maps.find_by(id: params[:id])
        redirect_to root_path, notice: 'Can\'t find site_map'
      end
    end
    def site_map_params
      params.require(:site_map).permit(:name)
    end
end

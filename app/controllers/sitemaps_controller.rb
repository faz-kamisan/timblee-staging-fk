class SitemapsController < ApplicationController
  before_filter :fetch_sitemap, only: [:destroy, :show, :update]

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
    @sitemap_props = @sitemap.to_react_data
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
      flash.now[:notice] = t('.success', scope: :flash)
      render 'shared/show_flash'
    else
      flash.now[:error] = t('.failure', scope: :flash)
      render 'shared/show_flash', status: 522
    end
  end

  private
    def fetch_sitemap
      unless @sitemap = current_business.sitemaps.find_by(id: params[:id])
        flash.now[:alert] = 'Sitemap Not Found'
        render 'shared/show_flash'
      end
    end

    def sitemap_params
      params.require(:sitemap).permit(:name, :folder_id, :state)
    end
end

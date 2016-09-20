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
    @sitemap_props = @sitemap.to_react_data.merge!(currentUser: { fullName: current_user.full_name, email: current_user.email })
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
          render 'shared/show_flash', status: 422
        end
        format.json do
          render json: t('.failure', scope: :flash) , status: 422
        end
      end
    end
  end

  private
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

    def sitemap_params
      params.require(:sitemap).permit(:name, :folder_id, :state)
    end
end

class PagesController < ApplicationController
  before_filter :fetch_page, only: [:destroy, :update]

  def create
    @page = Page.new(page_params)
    send_conditional_json_response(@page.save)
  end

  def destroy
    send_conditional_json_response(@page.destroy)
  end

  def update
    send_conditional_json_response(@page.update(page_params))
  end

  private
    def fetch_page
      unless @page = Page.find_by(id: params[:id])
        flash.now[:alert] = 'Page Not Found'
        render json: t('.not_found', scope: :flash) , status: 422
      end
    end

    def page_params
      params.require(:page).permit(:name, :sitemap_id, :parent_id, :page_type_id, :position)
    end

    def send_conditional_json_response(condition)
      if condition
        render json: { success: t('.success', scope: :flash) }, status: 200
      else
        render json: t('.failure', scope: :flash) , status: 522
      end
    end
end

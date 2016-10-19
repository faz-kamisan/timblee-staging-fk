class SectionsController < ApplicationController
  skip_before_filter :authenticate_user!
  before_filter :conditional_authenticate_user!
  before_filter :fetch_page, only: [:create]
  before_filter :fetch_section, only: [:destroy]

  def create
    @section = Section.new(section_params)
    @section.sitemap_id = @page.sitemap_id
    if(@section.save)
      @page.update(alt_section_id: @section.id)
      render json: @section.as_json, status: 200
    else
      render json: t('.failure', scope: :flash) , status: 422
    end
  end

  def destroy
    send_conditional_json_response(@section.destroy)
  end

  private
    def fetch_section
      unless @section = Section.find_by(id: params[:id])
        render json: t('.not_found', scope: :flash) , status: 404
      end
    end

    def fetch_page
      unless @page = Page.find_by(id: params[:page_id])
        render json: 'No Page selected for new section.' , status: 404
      end
    end

    def section_params
      params.require(:section).permit(:name)
    end

    def send_conditional_json_response(condition)
      if condition
        render json: @section.as_json, status: 200
      else
        render json: t('.failure', scope: :flash) , status: 422
      end
    end

    def conditional_authenticate_user!
      proxy_login? || (request.subdomains[0] == 'app') || authenticate_user!
    end
end

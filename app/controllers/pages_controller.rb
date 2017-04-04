class PagesController < ApplicationController
  skip_before_filter :authenticate_user!
  before_filter :conditional_authenticate_user!
  before_filter :fetch_page, only: [:destroy, :update]

  def create
    @page = Page.new(page_params)
    @page.section_id = (@page.parent.alt_section_id || @page.parent.section_id) if @page.parent_id?
    send_conditional_json_response(@page.save)
  end

  def destroy
    send_conditional_json_response(@page.update(state: 'archived'))
  end

  def update
    send_conditional_json_response(@page.update(page_params))
  end

  private
    def fetch_page
      unless @page = Page.find_by(id: params[:id])
        render json: t('.not_found', scope: :flash) , status: 422
      end
    end

    def page_params
      params.require(:page).permit(:name, :sitemap_id, :parent_id, :page_type_id, :position, :section_id, :state, :footer)
    end

    def send_conditional_json_response(condition)
      if condition
        Notification.generate(kind: :resolve_comments, sitemap: @page.sitemap, actor: current_user, resource: @page) if page_resolved?
        render json: @page.as_json, status: 200
      else
        render json: t('.failure', scope: :flash) , status: 422
      end
    end

    def page_resolved?
      params[:action] == 'update' && page_params.include?(:state) && @page.state == 'resolved' && @page.comments.present?
    end

    def conditional_authenticate_user!
      subdomain = request.subdomains[0]

      proxy_login? || subdomain || subdomain.in?(['app', 'start']) || authenticate_user!
    end
end

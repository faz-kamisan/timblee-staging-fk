class PagesController < ApplicationController
  before_filter :fetch_page, only: [:destroy, :update]

  def create
    @page = Page.new(page_params)
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
      params.require(:page).permit(:name, :sitemap_id, :parent_id, :page_type_id, :position, :section_id, :state)
    end

    def send_conditional_json_response(condition)
      if condition
        Notification.resolved_comment_notification(@page, current_user) if page_resolved?
        render json: @page.as_json, status: 200
      else
        render json: t('.failure', scope: :flash) , status: 422
      end
    end

    def page_resolved?
      params[:action] == 'update' && page_params.include?(:state) && @page.state == 'resolved' && @page.comments.present?
    end
end

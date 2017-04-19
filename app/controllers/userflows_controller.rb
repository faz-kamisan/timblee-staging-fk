class UserflowsController < ApplicationController
  before_action :load_userflow, only: [:crud_screens, :index]
  around_action :wrap_in_transaction, only: :crud_screens

  def index
    @screens = @userflow.screens.order(:level, :position).includes(page: :page_type).to_json(include: [:page, :page_type])
  end

  def crud_screens
    create_screens(params[:new_nodes].map{|node| node[1]}) if params[:new_nodes]
    update_screens(params[:updated_nodes].map{|node| node[1]})if params[:updated_nodes]
    delete_screens(params[:deleted_nodes]) if params[:deleted_nodes]
    render json: { success: 'success', saved_screens: @saved_screens.as_json(include: :page), updated_screens: @updated_screens.as_json(include: :page), deleted_screens: @deleted_screens.as_json(include: :page) }, status: 200
  end

  private

    def load_userflow
      @sitemap = Sitemap.find_by(id: params[:sitemap_id])
      if @sitemap && params[:userflow_id]
        @userflow = Userflow.find_by(id: params[:userflow_id])
      elsif @sitemap
        @userflow = @sitemap.userflows.order(:id).first.presence || @sitemap.userflows.create
      end
    end

    def create_screens(nodes)
      @saved_screens = []
      nodes.each_with_index do |node, i|
        parent_screen = @userflow.screens.find_by(node_id: node[:parentNode]) if node[:parentNode]
        page = @sitemap.pages.create(name: node[:name], page_type_id: node[:pageTypeId], section: @sitemap.default_section, parent_id: @sitemap.default_section.root_page.id, state: 'orphan') if node[:type] == 'page' && !node[:pageId].presence
        screen = @userflow.screens.create(node_id: node[:id], parent_id: parent_screen.try(:id), level: node[:level].to_i, position: node[:position].to_f, path: node[:path], node_type: node[:type], page_id: page.try(:id) || node[:pageId], message: node[:name])
        @saved_screens << screen if screen.id
      end
    end

    def delete_screens(node_ids)
      screens = @userflow.screens.where(node_id: node_ids).destroy_all
      @deleted_screens = screens
    end

    def update_screens(nodes)
      @updated_screens = []
      nodes.each_with_index do |node, i|
        parent_screen = @userflow.screens.find_by(node_id: node[:parentNode]) if node[:parentNode]
        screen = @userflow.screens.find_by(node_id: node[:id])
        @updated_screens << screen if screen.update(parent_id: parent_screen.try(:id), level: node[:level].to_i, position: node[:position].to_f, path: node[:path], node_type: node[:type], message: node[:name])
      end
    end

    def wrap_in_transaction
      begin
        ActiveRecord::Base.transaction do
          yield
        end
      rescue => e
        render js: ("document.setFlash(" + "'#{e.message}'" + ")")
      end
    end
end

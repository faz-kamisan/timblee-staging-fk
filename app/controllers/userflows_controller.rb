class UserflowsController < ApplicationController
  before_action :load_userflow, only: [:crud_screens, :index]
  around_action :wrap_in_transaction, only: :crud_screens

  def index
    @screens = @userflow.screens.order(:level, :position).to_json
  end

  def crud_screens
    create_screens(params[:new_nodes].map{|node| node[1]}) if params[:new_nodes]
    update_screens(params[:updated_nodes].map{|node| node[1]})if params[:updated_nodes]
    delete_screens(params[:deleted_nodes]) if params[:deleted_nodes]
    render json: { success: 'success', saved_ids: @saved_ids, updated_ids: @updated_ids, deleted_ids: @deleted_ids }, status: 200
  end

  private

    def load_userflow
      @sitemap = Sitemap.find_by(id: params[:sitemap_id])
      if @sitemap && params[:userflow_id]
        @userflow = Userflow.find_by(id: params[:userflow_id])
      elsif @sitemap
        @userflow = @sitemap.userflows.order(:id).first.presence || @sitemap.userflows.build
      end
    end

    def create_screens(nodes)
      @saved_ids = []
      nodes.each_with_index do |node, i|
        parent_screen = @userflow.screens.find_by(node_id: node[:parentNode]) if node[:parentNode]
        screen = @userflow.screens.create(node_id: node[:id], parent_id: parent_screen.try(:id), level: node[:level].to_i, position: node[:position].to_f, path: node[:path], node_type: node[:type])
        @saved_ids << screen.node_id if screen.id
      end
    end

    def delete_screens(node_ids)
      screens = @userflow.screens.where(node_id: node_ids).destroy_all
      @deleted_ids = screens.map(&:node_id)
    end

    def update_screens(nodes)
      @updated_ids = []
      nodes.each_with_index do |node, i|
        parent_screen = @userflow.screens.find_by(node_id: node[:parentNode]) if node[:parentNode]
        screen = @userflow.screens.find_by(node_id: node[:id])
        @updated_ids << screen.node_id if screen.update(parent_id: parent_screen.try(:id), level: node[:level].to_i, position: node[:position].to_f, path: node[:path], node_type: node[:type])
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

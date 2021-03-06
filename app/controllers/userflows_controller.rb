class UserflowsController < ApplicationController
  before_action :load_sitemap, only: [:crud_screens, :index, :show, :create, :destroy, :update]
  before_action :load_userflow, only: [:crud_screens, :index, :show, :destroy, :update]
  before_action :load_screens, only: [:show, :index, :update]
  around_action :wrap_in_transaction, only: :crud_screens

  def index
  end

  def show
    render :index
  end

  def update
    unless @userflow.update(update_params)
      flash.now[:error] = 'Something went wrong.'
    end
  end

  def create
    @userflow = @sitemap.userflows.build
    if @userflow.save
      redirect_to sitemap_userflow_path(@sitemap, @userflow)
    else
      flash[:error] = 'Some Error Occured.'
      redirect_to home_dashboard_path
    end
  end

  def destroy
    if @userflow.destroy
      redirect_to sitemap_userflows_path
    else
      flash[:error] = 'Some Error Occured.'
      redirect_to home_dashboard_path
    end
  end

  def crud_screens
    create_screens(params[:new_nodes].map{|node| node[1]}) if params[:new_nodes]
    update_screens(params[:updated_nodes].map{|node| node[1]})if params[:updated_nodes]
    delete_screens(params[:deleted_nodes]) if params[:deleted_nodes]
    render json: { success: 'success', saved_screens: @saved_screens.as_json(include: :page), updated_screens: @updated_screens.as_json(include: :page), deleted_screens: @deleted_screens.as_json(include: :page) }, status: 200
  end

  private

    def update_params
      params.require(:userflow).permit(:name)
    end


    def load_sitemap
      @sitemap = Sitemap.find_by(id: params[:sitemap_id])
      unless @sitemap
        flash[:error] = 'Project not found.'
        redirect_to home_dashboard_path
      end
    end

    def load_userflow
      if @sitemap && params[:id]
        @userflow = Userflow.find_by(id: params[:id])
        unless @userflow
        flash[:error] = 'Userflow not found.'
          redirect_to home_dashboard_path
        end
      elsif @sitemap
        @userflow = @sitemap.userflows.order(:id).first.presence || @sitemap.userflows.create
      end
    end

    def load_screens
      @screens = @userflow.screens.order(:level, :position).includes(page: :page_type).to_json(include: [:page, :page_type])
      @page_types = PageType.all
      @sitemap_screens = @sitemap.pages.where.not(id: @userflow.screens.pluck(:page_id), state: :archived)
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
        link_screen = @userflow.screens.find_by(node_id: node[:linkNode]) if node[:linkNode]
        screen = @userflow.screens.find_by(node_id: node[:id])
        @updated_screens << screen if screen.update(parent_id: parent_screen.try(:id), level: node[:level].to_i, position: node[:position].to_f, path: node[:path], node_type: node[:type], message: node[:name], linking_screen_id: link_screen.try(:id))
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

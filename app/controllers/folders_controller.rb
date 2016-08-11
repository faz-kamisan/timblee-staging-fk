class FoldersController < ApplicationController
  before_filter :fetch_folder, only: [:destroy, :update]

  def create
    @folder = current_business.folders.build(folder_params)
    if @folder.save
      flash.now[:notice] = t('.success', scope: :flash)
    else
      flash.now[:error] = t('.failure', scope: :flash)
    end
    @folders = current_business.folders.order_by_lower_name.includes(:sitemaps)
  end

  def destroy
    if @folder.destroy
      @destroyed = true
      flash.now[:notice] = t('.success', scope: :flash)
    else
      @destroyed = false
      flash.now[:error] = t('.failure', scope: :flash)
    end
  end

  def update
    if @folder.update(folder_params)
      flash.now[:notice] = t('.success', scope: :flash)
    else
      flash.now[:error] = t('.failure', scope: :flash)
    end
    @folders = current_business.folders.order_by_lower_name.includes(:sitemaps)
  end

  private

    def folder_params
      params.require(:folder).permit(:name)
    end

    def fetch_folder
      unless @folder = current_business.folders.find_by(id: params[:id])
        flash.now[:alert] = 'Folder Not Found'
        render 'shared/show_flash.js.erb'
      end
    end

end

class FoldersController < ApplicationController
  before_filter :authenticate_user!, only: [:create]
  before_filter :fetch_folder, only: [:destroy]
  def create
    @folder = current_user.business.folders.build(folder_params)
    if @folder.save
      flash.now[:notice] = 'Folder created successfully'
    else
      flash.now[:error] = 'Couldn\'t create folder'
    end
  end

  def destroy
    @folder.destroy
  end

  private
    def fetch_folder
      unless @folder = current_user.business.folders.find_by(id: params[:id])
        redirect_to root_path, notice: 'Can\'t find folder'
      end
    end
    def folder_params
      params.require(:folder).permit(:name)
    end
end

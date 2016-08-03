class HomeController < ApplicationController

  def dashboard
    @folders = current_business.folders.order(:name)
    @site_maps = current_user.all_site_maps
  end

  def settings
  end
end

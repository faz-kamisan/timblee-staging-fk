class HomeController < ApplicationController
  def dashboard
    if current_business
      @folders = current_business.folders.order(:name)
      @site_maps = current_user.all_site_maps
    end
  end

  def settings
  end

end

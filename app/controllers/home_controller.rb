class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def dashboard
    if current_business
      @folders = current_business.folders.order(:name)
      @site_maps = current_user.all_site_maps
    end
  end

  def settings
  end

end

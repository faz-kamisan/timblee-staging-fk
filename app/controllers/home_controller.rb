class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def dashboard
    @folders = current_business.folders.order(:name)
    @site_maps = current_user.all_site_maps
  end
end

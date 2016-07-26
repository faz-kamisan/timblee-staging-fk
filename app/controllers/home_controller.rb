class HomeController < ApplicationController
  def dashboard
    @site_maps = current_business.site_maps.order(:name) if current_user.present?
  end
end

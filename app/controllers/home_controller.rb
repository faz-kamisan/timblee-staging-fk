class HomeController < ApplicationController

  def dashboard
    @folders = current_business.folders.order_by_alphanumeric_lower_name.includes(:sitemaps)
    @sitemaps = current_user.all_sitemaps
  end

  def settings
  end

end

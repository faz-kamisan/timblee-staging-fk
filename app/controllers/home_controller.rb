class HomeController < ApplicationController

  def dashboard
    if current_business
      @folders = current_business.folders.order_by_lower_name.includes(:sitemaps)
      @sitemaps = current_user.all_sitemaps
    end
  end

  def settings
  end

end

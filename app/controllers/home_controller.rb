class HomeController < ApplicationController

  def dashboard
    if current_business
      @folders = current_business.folders.order_by_alphanumeric_lower_name.includes(:sitemaps)
      @sitemaps = current_user.all_sitemaps
      @card = current_business.active_card
    end
  end

  def settings
  end

end

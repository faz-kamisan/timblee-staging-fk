class HomeController < ApplicationController

  layout 'intro', only: :intro

  def dashboard
    @folders = current_business.folders.order_by_alphanumeric_lower_name.includes(:sitemaps)
    @sitemaps = current_user.all_sitemaps
    @card = current_business.active_card
  end

  def settings
  end

  def intro
  end
end

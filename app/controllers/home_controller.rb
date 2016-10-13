class HomeController < ApplicationController

  layout 'intro', only: :intro
  skip_before_action :lock_business_after_trial_end

  def dashboard
    @folders = current_business.folders.order_by_alphanumeric_lower_name.includes(:sitemaps)
    @sitemaps = current_user.all_sitemaps
    @card = current_business.active_card
  end

  def intro
  end
end

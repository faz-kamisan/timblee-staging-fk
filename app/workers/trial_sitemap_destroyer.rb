class TrialSitemapDestroyer
  include Sidekiq::Worker
  sidekiq_options queue: 'default'

  def perform(sitemap_id)
    sitemap = Sitemap.find_by(id: sitemap_id)
    if sitemap && sitemap.trial?
      sitemap.destroy
    end
  end
end

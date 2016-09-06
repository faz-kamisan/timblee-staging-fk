namespace :sitemaps do
  desc "Create Sections and update root page"
  task :create_sections => :environment do
    Sitemap.all.each do |sitemap|
      section = sitemap.sections.create(name: 'Default', default: true)
      Page.where(sitemap_id: sitemap.id).update_all(section_id: section.id)
    end
  end
end

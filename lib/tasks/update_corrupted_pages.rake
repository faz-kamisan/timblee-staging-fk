

namespace :fix_corrupted_pages do
  desc "Fix corrupted_pages"
  task :update => :environment do
##
#pages not showing in their respective sections

    parent_pages = Page.where(state: :active).where.not(alt_section_id: nil, parent_id: nil).select{ |page| page.children.any?{|child| child.section_id != page.alt_section_id }}

    p parent_pages.count, parent_pages.map{|page| {id: page.id, sitemap_id: page.sitemap_id, children_ids: page.children.pluck(:id), children_section_ids: page.children.pluck(:section_id)}}

    parent_pages.each { |page| page.children.update_all(section_id: page.alt_section_id)}

    p parent_pages.map{|page| {id: page.id, sitemap_id: page.sitemap_id, children_ids: page.children.pluck(:id), children_section_ids: page.children.pluck(:section_id)}}
##
#minus not opening pages

    corrupted_pages = Page.where(state: :active, footer: false).includes(:parent).select do |page|
      page.section_id && page.parent && page.section_id != page.parent.try(:alt_section_id) && page.section_id != page.parent.try(:section_id)
    end
    p corrupted_pages.count, corrupted_pages.map{|page| {id: page.id, sitemap_id: page.sitemap_id, section_id: page.section_id}}

    corrupted_pages.each {|page| page.update(section_id: page.parent.alt_section_id || page.parent.section_id) }

    p corrupted_pages.map{|page| {id: page.id, sitemap_id: page.sitemap_id, section_id: page.section_id}}
  end
end


task :corrupted_pages => :environment do
  corrupted_pages = Page.where(state: :active, footer: false).includes(:parent).select do |page|
    page.section_id && page.parent && page.section_id != page.parent.try(:alt_section_id) && page.section_id != page.parent.try(:section_id)
  end
  p corrupted_pages
end

task :parent_corrupted_pages => :environment do
  parent_pages = Page.where(state: :active).where.not(alt_section_id: nil, parent_id: nil).select{ |page| page.children.any?{|child| child.section_id != page.alt_section_id }}
  p parent_pages
end



namespace :fix_corrupted_pages do
  desc "Fix corrupted_pages"
  task :update => :environment do
##
#pages not showing in their respective sections

    corrupted_pages = Page.where(state: :active).where.not(alt_section_id: nil, parent_id: nil).select{ |page| page.children.any?{|child| child.section_id != page.alt_section_id }}
    corrupted_pages.each { |page| page.children.update_all(section_id: page.alt_section_id)}

##
#minus not opening pages

    more_corrupted_pages = Page.where(state: :active, footer: false).includes(:parent).select do |page|
       page.section_id && page.parent && page.section_id != page.parent.try(:alt_section_id) && page.section_id != page.parent.try(:section_id)
    end
    more_corrupted_pages.each {|page| page.update(section_id: page.parent.alt_section_id || page.parent.section_id) }

  end
end

class BusinessDefaultSitemapsService

  SEEDED_BUSINESS_ID = 827
  SEEDED_GUEST_ID = 34

  def initialize(business)
    @business = business
    @seeded_business = Business.find(SEEDED_BUSINESS_ID)
    @seeded_guest = Guest.find_by(id: SEEDED_GUEST_ID)
  end

  def add_default_sitemaps
    ([nil] + @seeded_business.folders).each do |folder|
      add_folders(folder)
    end
  end

  private

  def add_folders(folder)
    new_folder = @business.folders.create(name: folder.name) if folder
    original_sitemaps = folder ? folder.sitemaps : @seeded_business.sitemaps.where(folder_id: nil)

    original_sitemaps.each do |sitemap|
      add_sitemap(sitemap, new_folder)
    end
  end

  def add_sitemap(sitemap, new_folder)
    sitemap.assign_attributes(folder_id: new_folder.try(:id), business: @business, user: @business.owner)
    new_sitemap = sitemap.duplicate
    new_sitemap.update_column(:name, sitemap.name)
    (sitemap.comments + sitemap.page_comments).each do |comment|
      add_comment(comment, new_sitemap)
    end
  end

  def add_comment(comment, new_sitemap)
    new_comment = comment.dup
    new_comment.commentable = comment.commentable_type == 'Sitemap' ? new_sitemap : new_sitemap.pages.find_by(uid: comment.commentable.uid)
    new_comment.commenter = @seeded_guest
    new_comment.save
  end

end

class BusinessDefaultSitemapsService

  SEEDED_BUSINESS_ID = 827
  SEEDED_GUEST_ID = 34

  def initialize(business)
    @business = business
  end

  def seeded_business
    @seeded_business ||= Business.find_by(id: SEEDED_BUSINESS_ID)
  end

  def seeded_guest
    @seeded_guest ||= Guest.find_by(id: SEEDED_GUEST_ID)
  end


  def add_default_sitemaps
    if seeded_business
      seeded_business.sitemaps.where(folder_id: nil).each do |sitemap|
        add_sitemap(sitemap, nil)
      end

      seeded_business.folders.each do |folder|
        add_folders(folder)
      end
    end
  end

  private

  def add_folders(folder)
    new_folder = @business.folders.create(name: folder.name)
    folder.sitemaps.each do |sitemap|
      add_sitemap(sitemap, new_folder.id)
    end
  end

  def add_sitemap(sitemap, new_folder_id)
    sitemap.assign_attributes(folder_id: new_folder_id, business: @business, user: @business.owner)
    new_sitemap = sitemap.duplicate(sitemap.name)
    (sitemap.comments + sitemap.page_comments).each do |comment|
      add_comment(comment, new_sitemap)
    end
  end

  def add_comment(comment, new_sitemap)
    new_comment = comment.dup
    new_comment.commentable = if comment.commentable_type == 'Sitemap'
                                new_sitemap
                              else
                                new_sitemap.pages.find_by(uid: comment.commentable.uid)
                              end

    new_comment.commenter = seeded_guest
    new_comment.save
  end

end

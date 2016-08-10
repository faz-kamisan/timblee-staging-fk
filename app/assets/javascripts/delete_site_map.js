var DeleteSiteMap = function(options) {
  this.deleteSitemapLink = options.deleteSitemapLink;
  this.sitemapModalLink = options.sitemapModalLink;
  this.sitemapNameSpan = options.sitemapNameSpan;
};

DeleteSiteMap.prototype.bindEvents = function() {
  var _this = this;
  this.sitemapModalLink.on('click', function() {
    delete_sitemap_url = $(this).data('url');
    delete_sitemap_name = $(this).data('name');
    _this.deleteSitemapLink.attr('href', delete_sitemap_url);
    _this.sitemapNameSpan.html(delete_sitemap_name);
  })
};


$(function() {
  var options = {
    deleteSitemapLink : $('#delete-sitemap-link'),
    sitemapModalLink: $('.delete-site-map-modal-link'),
    sitemapNameSpan: $('.sitemap-name-to-delete .inner-name')
  }
  var delete_sitemap = new DeleteSiteMap(options);
  delete_sitemap.bindEvents();
});

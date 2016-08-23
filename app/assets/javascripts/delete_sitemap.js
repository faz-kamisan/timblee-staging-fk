var DeleteSitemap = function(options) {
  this.deleteSitemapLink = options.deleteSitemapLink;
  this.sitemapModalLink = options.sitemapModalLink;
  this.sitemapNameSpan = options.sitemapNameSpan;
};

DeleteSitemap.prototype.bindEvents = function() {
  var _this = this;
  this.sitemapModalLink.on('click', function(event) {
    var $this = $(this);
    var delete_sitemap_url = $this.data('url'),
    delete_sitemap_name = $this.data('name');
    _this.deleteSitemapLink.attr('href', delete_sitemap_url);
    _this.sitemapNameSpan.html(delete_sitemap_name);
    $('#delete-sitemap-modal .modal-body .site-map-clone').html($this.closest('.site-card').clone().addClass('cloned'));
  });
};

$(function() {
  var options = {
    deleteSitemapLink : $('#delete-sitemap-link'),
    sitemapModalLink: $('.delete-sitemap-modal-link'),
    sitemapNameSpan: $('.sitemap-name-to-delete .inner-name')
  }
  var delete_sitemap = new DeleteSitemap(options);
  delete_sitemap.bindEvents();
});

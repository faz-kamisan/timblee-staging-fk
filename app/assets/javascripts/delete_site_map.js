var DeleteSiteMap = function(options) {
  this.delete_sitemap_link = options.delete_sitemap_link;
  this.sitemap_modal_link = options.sitemap_modal_link;
  this.sitemap_name_span = options.sitemap_name_span;
};

DeleteSiteMap.prototype.bindEvents = function() {
  var _this = this;
  this.sitemap_modal_link.on('click', function() {
    delete_sitemap_url = $(this).data('url');
    delete_sitemap_name = $(this).data('name');
    _this.delete_sitemap_link.attr('href', delete_sitemap_url);
    _this.sitemap_name_span.html(delete_sitemap_name);
  })
};


$(function() {
  var options = {
    delete_sitemap_link : $('#delete-sitemap-link'),
    sitemap_modal_link: $('.delete-site-map-modal-link'),
    sitemap_name_span: $('.sitemap-name-to-delete .inner-name')
  }
  var delete_sitemap = new DeleteSiteMap(options);
  delete_sitemap.bindEvents();
});

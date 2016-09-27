var DuplicateSitemap = function(options) {
  this.sitemapsListing = options.sitemapsListing;
  this.duplicateSitemapLink = options.duplicateSitemapLink;
};

DuplicateSitemap.prototype.bindEvents = function() {
  var _this = this;
  _this.sitemapsListing.on('click', _this.duplicateSitemapLink, function (e) {
    $(e.target).closest('.actions-overlay').find('.close-action-overlay').click();
    $(e.target).closest('form').submit();
  });
};

$(function() {
  var options = {
    sitemapsListing : $('.sitemaps-listing'),
    duplicateSitemapLink : '.duplicate-sitemap-link'
  }
  var duplicateSitemap = new DuplicateSitemap(options);
  duplicateSitemap.bindEvents();
});

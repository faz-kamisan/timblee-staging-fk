var DuplicateSitemap = function(options) {
  this.duplicateSitemapLink = options.duplicateSitemapLink;
};

DuplicateSitemap.prototype.bindEvents = function() {
  var _this = this;
  _this.duplicateSitemapLink.on('click', function (e) {
    $(this).closest('.actions-overlay').find('.close-action-overlay').click();
    $(this).closest('form').submit();
  });
};

$(function() {
  var options = {
    duplicateSitemapLink : $('.duplicate-sitemap-link')
  }
  var duplicateSitemap = new DuplicateSitemap(options);
  duplicateSitemap.bindEvents();
});

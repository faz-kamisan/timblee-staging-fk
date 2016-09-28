var RenameSitemap = function(options) {
  this.renameSitemapLink = options.renameSitemapLink;
  this.sitemapNameInputField = options.sitemapNameInputField;
};

RenameSitemap.prototype.bindEvents = function() {
  var _this = this;
  _this.renameSitemapLink.on('click', function (e) {
    $(this).closest('.actions-overlay').find('.close-action-overlay').click();
    $(this).closest('.site-card').find('.saved-sitemap-name').addClass('hide');
    $(this).closest('.site-card').find('.edit-sitemap-name').removeClass('hide');
    $(this).closest('.site-card').find(_this.sitemapNameInputField).focus();
  });

  _this.sitemapNameInputField.focusout(function () {
    $(this).closest('form').submit();
  });

};

$(function() {
  var options = {
    renameSitemapLink : $('.rename-sitemap-link'),
    sitemapNameInputField: $('.sitemap-rename-input')
  }
  var renameSitemap = new RenameSitemap(options);
  renameSitemap.bindEvents();
});

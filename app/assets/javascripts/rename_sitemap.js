var RenameSitemap = function(options) {
  this.renameSitemapLink = options.renameSitemapLink;
  this.sitemapNameInputField = options.sitemapNameInputField;
  this.flag = true;
};

RenameSitemap.prototype.bindEvents = function() {
  var _this = this;
  _this.renameSitemapLink.on('click', function (e) {
    $(this).closest('.actions-overlay').find('.close-action-overlay').click();
    $(this).closest('.site-card').find('.saved-sitemap-name').addClass('hide');
    $(this).closest('.site-card').find('.edit-sitemap-name').removeClass('hide');
    $(this).closest('.site-card').find(_this.sitemapNameInputField).focus();
  });

  _this.sitemapNameInputField.focusout(function (e) {
    // debugger
    if(_this.flag) {
      if($(this).data('original-value') != $(this).val()) {
        $(this).closest('form').submit();
      } else {
        $(this).closest('.site-card').find('.saved-sitemap-name').removeClass('hide');
        $(this).closest('.site-card').find('.edit-sitemap-name').addClass('hide');
      }
    } else {
      _this.flag = true;
    }
  });

  _this.sitemapNameInputField.keypress(function (e) {
    if(e.which == 13) {
      _this.flag = false;
    }
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

var Banner = function(options) {
  this.closeBtn = options.closeBtn;
  this.bannerDiv = options.bannerDiv;
};

Banner.prototype.closeMessage = function() {
  var _this = this;
  this.closeBtn.on("click", function() {
    document.cookie = 'show_expiry_banner=false;path=/';
    _this.bannerDiv.addClass('hide');
    $('body').removeClass('with-dark-header');
  });
};

$(function() {
  var options = {
    bannerDiv: $('.expiring-header'),
    closeBtn : $('.expiring-header .icon-close')
  };
   new Banner(options).closeMessage();
});

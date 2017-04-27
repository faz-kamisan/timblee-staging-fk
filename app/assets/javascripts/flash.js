var Flash = function(options) {
  this.flashMessage = options.flashMessage;
  this.closeBtn = options.closeBtn;
  this.flashDiv = options.flashDiv;
};

Flash.prototype.closeMessage = function() {
  var _this = this;
  this.flashDiv.on("click", _this.closeBtn, function() {
    $(this).html('');
  });
};

$(function() {
  var options = {
    flashMessage : $('.flash'),
    flashDiv: $('.flash-message'),
    closeBtn : $('.close')
  },
  flashTimer = $('.flash-message').text().length > 40 ? 8000 : 5000,
  flash = new Flash(options);
  $('body').on('DOMNodeInserted', '.flash', function () {
    var $this = $(this);
    var flashTimer = $('.flash-message').text().length > 40 ? 8000 : 5000;
    window.setTimeout(function() {
      $this.remove();
    }, flashTimer)
  });
  window.setTimeout(function() {
    $('.flash').remove();
  }, flashTimer)
  flash.closeMessage();
});

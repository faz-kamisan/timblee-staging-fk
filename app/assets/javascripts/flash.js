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
  flashTimer = $('.flash_message').html() === FLASH_FOR_TRIAL_OVER ? 30000 : 5000,
  flash = new Flash(options);
  $('body').on('DOMNodeInserted', '.flash', function () {
    var $this = $(this)
    window.setTimeout(function() {
      $this.remove();
    }, flashTimer)
  });
  window.setTimeout(function() {
    $('.flash').remove();
  }, flashTimer)
  flash.closeMessage();
});

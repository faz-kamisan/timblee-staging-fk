var Flash = function(options) {
  this.flashMessage = options.flashMessage;
  this.closeBtn = options.closeBtn;
};

Flash.prototype.closeMessage = function() {
  var _this = this;
  this.closeBtn.on('click', function() {
    $(this).closest(_this.flashMessage).remove();
  });
};

$(function() {
  var options = {
    flashMessage : $('.message'),
    closeBtn : $('.flash .close')
  },
  flash = new Flash(options);
  flash.closeMessage();
});
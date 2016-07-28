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
  flash = new Flash(options);
  flash.closeMessage();
});

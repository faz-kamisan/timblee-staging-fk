var ModalFix = function(options) {
  this.modalBtn = options.modalBtn;
  this.target = options.target;
  this.targetClass = options.targetClass;
  this.delayTime = options.delayTime;
};

ModalFix.prototype.fixScroll = function() {
  var _this = this;
  this.modalBtn.on('click', function() {
    setTimeout(function() {
      _this.target.addClass(_this.targetClass);
    }, _this.delayTime);
  });
};

$(function() {
  var options = {
    modalBtn : $('.btn-modal-open'),
    target: $('body'),
    targetClass: 'modal-open',
    delayTime: 500
  },
  modalFix = new ModalFix(options);
  modalFix.fixScroll();
});
var ModalFix = function(options) {
  this.modalBtn = options.modalBtn;
  this.target = options.target;
  this.targetClass = options.targetClass;
  this.delayTime = options.delayTime;
};

ModalFix.prototype.fixScroll = function() {
  var _this = this;
  $('body').on('click', '.btn-modal-open', function() {
    setTimeout(function() {
      _this.target.addClass(_this.targetClass);
    }, _this.delayTime);
  });
   $('body').on('click', '.btn-modal-open-delay', function() {
    setTimeout(function() {
      _this.target.addClass(_this.targetClass);
    }, 1000);
  });
};

$(function() {
  var options = {
    modalBtn : $('.btn-modal-open'),
    target: $('body'),
    targetClass: 'modal-open',
    delayTime: 400
  },
  modalFix = new ModalFix(options);
  modalFix.fixScroll();
});

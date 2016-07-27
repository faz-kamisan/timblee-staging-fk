var MoreOptions = function(options) {
  this.actionOverlay = options.actionOverlay;
  this.openOverlayBtn = options.openOverlayBtn;
  this.closeOverlayBtn = options.closeOverlayBtn;
  this.animateClass = options.animateClass;
};

MoreOptions.prototype.open = function() {
  var _this = this;
  this.openOverlayBtn.on('click', function() {
    $(this).siblings(_this.actionOverlay).addClass(_this.animateClass);
  });
};

MoreOptions.prototype.close = function() {
  var _this = this;
  this.closeOverlayBtn.on('click', function() {
    $(this).closest(_this.actionOverlay).removeClass(_this.animateClass);
  });
};

MoreOptions.prototype.bindEvents = function() {
  this.open();
  this.close();
};

$(function() {
  var options = {
    actionOverlay : $('.actions-overlay'),
    openOverlayBtn : $('.more-options'),
    closeOverlayBtn : $('.close-action-overlay'),
    animateClass : 'animate-top'
  },
  moreOptions = new MoreOptions(options);
  moreOptions.bindEvents();
});

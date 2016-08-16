var MoreOptions = function(options) {
  this.actionOverlay = options.actionOverlay;
  this.openOverlayBtn = options.openOverlayBtn;
  this.closeOverlayBtn = options.closeOverlayBtn;
  this.animateClass = options.animateClass;
};

MoreOptions.prototype.open = function() {
  var _this = this;
  this.openOverlayBtn.on('click', function() {
    $(this).next(_this.actionOverlay).animate({ top: 0 }, 150);
  });
};

MoreOptions.prototype.close = function() {
  var _this = this;
  this.closeOverlayBtn.on('click', function() {
    $(this).closest(_this.actionOverlay).animate({ top: 230 }, 150);
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

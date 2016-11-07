var AnimateTab = function(options) {
  this.animatedTab = options.animatedTab;
  this.animatedBar = options.animatedBar;
  this.listItemMargin = options.listItemMargin;
};

AnimateTab.prototype.calcuate = function($this) {
  var _this = this;

  var animatedBar = $(_this.animatedTab).siblings(_this.animatedBar)

  if($this.is(':first-child')) {
    animatedBar.animate({left: $this.position().left, width: $this.outerWidth() }, 200);
  }
  else {
    animatedBar.animate({left: $this.position().left + _this.listItemMargin, width: $this.outerWidth() }, 200);
  }
};

AnimateTab.prototype.move = function() {
  var _this = this;

  if(_this.animatedTab) {
    $(document).on('click', _this.animatedTab, function(){
      _this.calcuate($(this));
    })
  }
};

$(function() {
  var shareTab = '.share-method-tabs .animated-tab',
      commentTab = '.comment-list .animated-tab',
      settingsTab = '.nav-tabs .animated-tab',
      options = {
        animatedTab: commentTab,
        animatedBar: '.animated-bar-react',
        listItemMargin: 33
      },
      optionsSettings = {
        animatedTab: settingsTab,
        animatedBar: '.animated-bar-rails',
        listItemMargin: 27
      },
      optionsShare = {
        animatedTab: shareTab,
        animatedBar: '.animated-bar-share',
        listItemMargin: 0
      },
      animateTab = new AnimateTab(options);
      animateTabSettings = new AnimateTab(optionsSettings);
      animateTabShare = new AnimateTab(optionsShare);

  animateTab.move();
  animateTabSettings.move();
  animateTabShare.move();
});

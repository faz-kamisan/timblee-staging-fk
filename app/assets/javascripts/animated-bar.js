var AnimateTab = function(options) {
  this.animatedTab = options.animatedTab;
  this.animatedBar = options.animatedBar;
  this.listItemMargin = options.listItemMargin;
};

AnimateTab.prototype.calcuate = function($this) {
  var _this = this;
  if($this.is(':first-child')) {
    _this.animatedBar.animate({left: $this.position().left, width: $this.outerWidth() }, 200);
  }
  else {
    _this.animatedBar.animate({left: $this.position().left + _this.listItemMargin, width: $this.outerWidth() }, 200);
  }
};

AnimateTab.prototype.move = function() {
  var _this = this;
  if(this.animatedTab.length) {
    _this.animatedTab.on('click', function() {
      _this.calcuate($(this));
    });
  }
};

$(function() {
  var shareTab = $('.share-method-tabs .animated-tab'),
      commentTab = $('.comment-list .animated-tab'),
      settingsTab = $('.nav-tabs .animated-tab'),
      options = {
        animatedTab: commentTab,
        animatedBar: commentTab.siblings('.animated-bar-react'),
        listItemMargin: 33
      },
      optionsSettings = {
        animatedTab: settingsTab,
        animatedBar: settingsTab.siblings('.animated-bar-rails'),
        listItemMargin: 27
      },
      optionsShare = {
        animatedTab: shareTab,
        animatedBar: shareTab.siblings('.animated-bar-share'),
        listItemMargin: 0
      },
      animateTab = new AnimateTab(options);
      animateTabSettings = new AnimateTab(optionsSettings);
      animateTabShare = new AnimateTab(optionsShare);

  animateTab.move();
  animateTabSettings.move();
  animateTabShare.move();
});

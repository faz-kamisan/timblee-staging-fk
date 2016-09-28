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

AnimateTab.prototype.checkOnLoad = function($this) {
  var _this = this;
  if(($this.is(':first-child')) && ($this.hasClass('active'))) {
    _this.animatedBar.animate({left: $this.position().left, width: $this.outerWidth() }, 200);
  }
  else if($this.hasClass('active')) {
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

AnimateTab.prototype.bindEvents = function() {
  this.checkOnLoad(this.animatedTab);
  this.move();
};

$(window).on('load', function() {
  var tab = $('.animated-tab'),
      options = {
        animatedTab: tab,
        animatedBar: tab.siblings('.animated-bar-react'),
        listItemMargin: 33
      },
      optionsSettings = {
        animatedTab: tab,
        animatedBar: tab.siblings('.animated-bar-rails'),
        listItemMargin: 27
      },
      animateTab = new AnimateTab(options);
      animateTabSettings = new AnimateTab(optionsSettings);

  animateTab.move();
  animateTabSettings.bindEvents();
});

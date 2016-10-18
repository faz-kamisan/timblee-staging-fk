var Header = function(options) {
  this.userDropDown = options.userDropDown;
};

Header.prototype.calcuate = function($this) {
  var _this = this;
  if($this.is(':first-child')) {
    _this.animatedBar.animate({left: $this.position().left, width: $this.outerWidth() }, 200);
  }
  else {
    _this.animatedBar.animate({left: $this.position().left + _this.listItemMargin, width: $this.outerWidth() }, 200);
  }
};

Header.prototype.bindEvents = function() {
  var _this = this;
  this.userDropDown.on('click', function(e) {
    if($(e.target).closest('.user-settings').length == 0) {
      $(this).toggleClass('active');
    }
  })
  $('body').on('click', function(e) {
    if($(e.target).closest('.user-dropdown').length == 0) {
      $('.user-dropdown').removeClass('active');
    }
  })
};

$(window).on('load', function() {
  var options = {
        userDropDown: $('.user-dropdown')
      },
      header = new Header(options);
  header.bindEvents()
});

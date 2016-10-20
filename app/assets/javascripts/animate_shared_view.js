$(window).on('load', function() {

  var sharedView = $('.shared-view');
  var levelZero = $('.level-0');
  var levelZeroWidth = levelZero.width();
  var horizontalCenter = Math.floor(levelZeroWidth);

  if(sharedView.length > 0) {
    $('html,body').animate({scrollLeft: horizontalCenter}, 250);
  }

});

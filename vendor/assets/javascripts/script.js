$(window).on('load', function() {

  var $lastSlide = $('.slides li');
  var $skipSection = $('.skip');
  var $replaySection = $('.replay');

  $('.flexslider').flexslider({
    animation: "fade",
    directionNav: false,
    animationLoop: false,
    slideshowSpeed: 5000,
    after: function() {
      if($lastSlide.last().hasClass('flex-active-slide')) {
        $skipSection.fadeOut(200);
        $replaySection.fadeIn(200);
      }
      else {
        $skipSection.fadeIn(200);
        $replaySection.fadeOut(200); 
      }
    }
  });

  $('#replay_intro').on('click', function() {
    $('.flex-control-nav li').first().find('a').click();
    $('.flexslider').flexslider('play');
  });

});
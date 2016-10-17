$(function() {
  var intro = $('.intro-container');
  var body = $('body');

  if(intro.length > 0) {
    body.addClass('full-width');
  }
  else {
   body.removeClass('full-width'); 
  }
});
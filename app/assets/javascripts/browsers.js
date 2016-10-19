$(document).ready(function() {
  if((navigator.userAgent.indexOf('Safari') > -1) && !(navigator.userAgent.indexOf('Chrome') > -1)) {
    $('body').addClass('safari');
  }
  if((navigator.userAgent.indexOf('Safari') > -1) && (navigator.userAgent.indexOf('Chrome') > -1)) {
    $('body').addClass('chrome');
  }
});
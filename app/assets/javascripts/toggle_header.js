$(document).ready(function() {
  $('.toggle-header').on('click', function() {
    $('.main-header').toggleClass('toggle');
    $('.react-header').toggleClass('toggle');
    $('body').toggleClass('toggle');
    $('.sitemap-left-sidebar').toggleClass('toggle');
  });
});
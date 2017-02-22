$(document).ready(function() {
  $('.share-by-url').on('click', function() {
    $(this).closest('.modal-dialog').css('margin', '-314px 0 0 -372px');
  });

  $('.share-by-pdf').on('click', function() {
    $(this).closest('.modal-dialog').css('margin', '-344px 0 0 -372px');
  });

  $('.share-by-image').on('click', function() {
    $(this).closest('.modal-dialog').css('margin', '-343px 0 0 -372px');
  });
});
$(function() {
  $('.settings').parents('body').addClass('bg-white');

  if ($('#thanks-modal').data('show')) {
    $('#thanks-modal').modal('show');
  }
});

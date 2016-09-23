$(function () {
  var sitemapNames = JSON.parse($('#search-sitemap').attr('data-source'));
  $('#search-sitemap').autocomplete({
    minLength: 0,
    autoFocus:true,
    source: sitemapNames,
    appendTo: '#search-sitemap-form',
    select: function(event, ui) {
      $("#search-sitemap-form").attr('action', $("#search-sitemap-form").attr('action') + '/' + ui.item.value );
      $("#search-sitemap").attr('disabled', true);
      $("#search-sitemap").hide();
      $("#search-sitemap-form").submit();
    }
  }).autocomplete( "widget" ).addClass( "dropdown-menu sitemap-names-dropdown");


  $('#jump-to').click(function (event) {
    $("#search-sitemap-form").removeClass('hide');
      var downKeyEvent = $.Event("keydown");
      downKeyEvent.keyCode = $.ui.keyCode.DOWN;  // event for pressing "down" key
      $('#search-sitemap').trigger(downKeyEvent);
      $("#search-sitemap").focus();
      $('#search-sitemap').val('');
  })

  $('body').click(function (event) {
    if($(event.target).closest('#jump-to').length == 0) {
      $("#search-sitemap-form").addClass('hide');
    }
  })
});

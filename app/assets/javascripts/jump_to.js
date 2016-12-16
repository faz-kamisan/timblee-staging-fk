$(function () {
  var sitemapNames = JSON.parse($('#search-sitemap').attr('data-source')),
      flag = true;
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
    },
    close: function (event, ui) {
      if(event.originalEvent && event.originalEvent.type == 'blur'){
        $("#search-sitemap-form").removeClass('show-this');
        flag = false;
      }
    }
  }).autocomplete( "widget" ).addClass( "dropdown-menu sitemap-names-dropdown");


  $('#jump-to').click(function (event) {
    if(flag){
      $("#search-sitemap-form").addClass('show-this');
      var downKeyEvent = $.Event("keydown");
      downKeyEvent.keyCode = $.ui.keyCode.DOWN;  // event for pressing "down" key
      $('#search-sitemap').trigger(downKeyEvent);
      $("#search-sitemap").focus();
      $('#search-sitemap').val('');
    }
      flag = true;
  })

  $('body').click(function (event) {
    if($(event.target).closest('#jump-to').length == 0) {
      $("#search-sitemap-form").removeClass('show-this');
      flag = true;
    }
  })
});

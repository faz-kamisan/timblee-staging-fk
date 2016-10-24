// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require bootstrap.min
//= require tag-it.min
//= require jquery.watermark.min
//= require Queue
//= require flash
//= require array_decorator
//= require document_decorator
//= require date_decorator
//= require editFields
//= require apply_twemoji
//= require select2.min
//= require settings
//= require constants
//= require modal_fix
//= require toggle_class
//= require jquery.flexslider-min
//= require script
//= require animated-bar
//= require settings_tabs
//= require share_modal
//= require twemoji-picker
//= require full_body
//= require header
//= require browsers
//= require animate_shared_view

$(window).on('load resize', function() {
  if($('.level-0').length) {
    $('.intro-box-1').css('left', $('.level-0 > .page-tile').offset().left + 224);
  }
  var $bussinessName = $('.business-name');
  $bussinessName.css('margin-top', -$bussinessName.height()/2);
});

$(document).ready(function() {
  var rename = $('.sitemap-rename-input');
  rename.each(function() {
    document.moveCaretToEnd(this);
  });

  $('.twemoji-list span').each(function() {
    var $this = $(this);
    $this.on('click', function() {
      $this.closest('.twemoji-wrap').find('.twemoji-icon-picker img').click();
    });
  });

});


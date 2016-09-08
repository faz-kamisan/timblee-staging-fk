//= require webpack-bundle

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
//= require editFields
//= require twemoji-picker
//= require apply_twemoji
//= require settings_tabs
//= require settings
//= require constants
//= require modal_fix

$(document).ready(function() {
  $('.toggle-header').on('click', function() {
    $('.main-header').toggleClass('toggle');
    $('.react-header').toggleClass('toggle');
    $('body').toggleClass('toggle');
    $('.sitemap-left-sidebar').toggleClass('toggle');
  });
  $('.select-card li').on('click', function() {
    $('.select-card li').removeClass('active');
    $(this).addClass('active');
  });
});

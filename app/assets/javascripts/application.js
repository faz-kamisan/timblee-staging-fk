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
//= require full_body
//= require header
//= require browsers
//= require animate_shared_view
//= require jquery.mentions
//= require emoji

$(window).on('load resize', function() {
  var $bussinessName = $('.business-name');
  $bussinessName.css('margin-top', -$bussinessName.height()/2);
});

$(window).on('load', function() {
  var outerContent = $('.scrollable-div-sitemaps');
  var innerContent = $('.scrollable-div-sitemaps > div');
  outerContent.scrollLeft((innerContent.width() - outerContent.width()) / 2);
});

function setupEmojiPicker(){
  var ep = new EmojiPicker({ assetsPath: EmojiAssetsPath });
  ep.discover();
};

function displayPlaceholderText($element) {
  if(!$element.html()) {
    $element.siblings('.new-comment-place-holder').show()
  } else {
    $element.siblings('.new-comment-place-holder').hide()
  }
};

$(document).ready(function() {
  var rename = $('.sitemap-rename-input');
  rename.each(function() {
    document.moveCaretToEnd(this);
  });

  setupEmojiPicker();

  $(document).on('keyup', '.emoji-wysiwyg-editor', function(){
    displayPlaceholderText($(this))
  });
});


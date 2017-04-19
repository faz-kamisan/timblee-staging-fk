var FlowchartExtended = function () {
  this.bindEvents();
}
FlowchartExtended.prototype.bindEvents = function() {
  this.bindToggleCommentState();
  this.bindToggleHeaderState();
  this.messageFormatter();
};

FlowchartExtended.prototype.bindToggleCommentState = function() {
  $('.comment-tab.animated-tab').on('click', function (e) {
    $('.comment-tab.animated-tab').removeClass('active');
    $(this).addClass('active');
    if ($(this).hasClass('state-active')) {
      $('.comment-text').addClass('hide');
      $('.comment-text.state-active').removeClass('hide');
      $('.general-comments').removeClass('hide');
    } else if($(this).hasClass('state-resolved')){
      $('.comment-text').addClass('hide');
      $('.comment-text.state-resolved').removeClass('hide');
      $('.general-comments').addClass('hide');
    }else if ($(this).hasClass('state-archived')) {
      $('.comment-text').addClass('hide');
      $('.comment-text.state-archived').removeClass('hide');
      $('.general-comments').addClass('hide');
    };
  })

  $('.btn-toggle-comments').on('click', function (e) {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.sitemap-right-sidebar').addClass('open');
      $('.comment-list.clearfix').addClass('open');
    } else{
      $('.sitemap-right-sidebar').removeClass('open');
      $('.comment-list.clearfix').removeClass('open');
    };
  })
}

FlowchartExtended.prototype.bindToggleHeaderState = function() {
  $('.inner-toggle').on('click', function (e) {
    $(this).toggleClass('caret-up');
    if ($(this).hasClass('caret-up')) {
      $(this).find('div').html('hide');
      $('body').removeClass('hide-header')
    } else{
      $('body').addClass('hide-header')
      $(this).find('div').html('show');
    };
  })
};

FlowchartExtended.prototype.messageFormatter= function() {
  $('.comment-message').each(function (e) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
    var text1 = $(this).html().replace(exp, "<a target='_blank' href='$1'>$1</a>")
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
    $(this).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>').replace(/<strong(.*?)>(.*?)<\/strong>/g, function(match, p1, p2) { return('<span class="comment-mention">@' + p2 + '</span>') }));

  })
}

$(function(){
  new FlowchartExtended();
})

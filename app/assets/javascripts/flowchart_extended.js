var FlowchartExtended = function () {
  this.bindEvents();
}
FlowchartExtended.prototype.bindEvents = function() {
  this.bindToggleCommentState();
  this.bindToggleHeaderState();
  this.messageFormatter();
  this.bindAddGeneralComment();
  this.bindAddPageComment();
  this.bindClearComment();
  this.bindResolveUnresolvePages();
  this.bindSearchScreen();

  $(document).click(function (event) {
    if($(event.target).closest('.default-screen-hover-options').length == 0) {
      $('.default-screen-hover-options').removeClass('show-dropdown');
      $('.add-initial-screen-dropdown').addClass('hide');
    }
    if($(event.target).closest('.tile').length == 0) {
      $('body').removeClass('link-stage-2');
    }
  })

  $(document).on('submit', '.search-screen-form', function (e) {
    e.preventDefault();
  })

  $(document).on('submit', '.edit-name-form', function (e) {
    e.preventDefault();
    $(this).find('.edit-name-field').blur();
  })

  $(document).on('click', '.delete-userflow-modal-link', function () {
    $('#delete-userflow-modal').modal('show');
    $('#delete-userflow-modal').find('.delete-modal-userflow-name').html($(this).data('userflow-name'))
    $('#delete-userflow-modal').find('#confirm-delete-userflow-btn').attr('href', $(this).data('delete-userflow-path'))
  })

  $(document).on('click', '.edit-userflow-name-modal-link', function () {
    $('#update-userflow-name-modal').modal('show');
    $('#update-userflow-name-modal').find('.update-userflow-form .userflow-name-input').val($(this).data('userflow-name')).focus();
    $('#update-userflow-name-modal').find('.update-userflow-form').attr('action', $(this).data('update-userflow-path'))
  })
};

FlowchartExtended.prototype.bindSearchScreen = function() {
  $(document).on('input', '.search-screen-input', function (e) {
    var $this = $(this);
    var list = $this.parent('.search-screen-form').find('ul.screens-list li')
    for (var i = 0; i < list.length; i++) {
      if($(list[i]).html().toLowerCase().includes($this.val().toLowerCase())){
        $(list[i]).removeClass('hide')
      }else{
        $(list[i]).addClass('hide')
      }
    };
  })
};

FlowchartExtended.prototype.bindResolveUnresolvePages = function() {
  $(document).on('click', '.resolve-unresolve-pages', function () {
    if ($(this).find('input').attr('checked') == 'checked') {
      var state = 'active'
    } else{
      var state = 'resolved'
    };
    $.ajax({
      url: '/pages/' + $(this).data('page-id'),
      method: 'put',
      dataType: 'JSON',
      data: { page: { state: state } },
      error: function(result) {
        document.setFlash(result.responseText)
      },
      success: function(result) {
        var $li = null;
        var $div = $('.comments-page-' + result.id);
        if (result.state == 'resolved') {
          $div.find('.resolve-unresolve-pages span').html('Unresolve')
          $div.find('.comment-holder').addClass('hide')
          $div.find('.resolve-unresolve-pages input').attr('checked', 'checked')
          $li = $('li.comments-page-list-' + result.id).clone();
          $('li.comments-page-list-' + result.id).remove();
          $('.resolved-comments .resolved-list').append($li);
        } else{
          $div.find('.resolve-unresolve-pages span').html('Mark as resolved');
          $div.find('.comment-holder').removeClass('hide')
          $div.find('.resolve-unresolve-pages input').attr('checked', false)
          $li = $('li.comments-page-list-' + result.id).clone();
          $('li.comments-page-list-' + result.id).remove();
          $('.general-comments .active-pages-list').append($li);
        };
      }
    });
  })
};
FlowchartExtended.prototype.bindToggleCommentState = function() {
  $('.comment-tab.animated-tab').on('click', function (e) {
    $('.comment-tab.animated-tab').removeClass('active');
    $(this).addClass('active');
    if ($(this).hasClass('state-active')) {
      $('.comment-text').addClass('hide');
      $('.comment-text.state-active').removeClass('hide');
      $('.general-comments').removeClass('hide');
      $('.resolved-comments').addClass('hide');
      $('.archived-comments').addClass('hide');
    } else if($(this).hasClass('state-resolved')){
      $('.comment-text').addClass('hide');
      $('.comment-text.state-resolved').removeClass('hide');
      $('.general-comments').addClass('hide');
      $('.resolved-comments').removeClass('hide');
      $('.archived-comments').addClass('hide');
    }else if ($(this).hasClass('state-archived')) {
      $('.comment-text').addClass('hide');
      $('.comment-text.state-archived').removeClass('hide');
      $('.general-comments').addClass('hide');
      $('.resolved-comments').addClass('hide');
      $('.archived-comments').removeClass('hide');
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
};

FlowchartExtended.prototype.bindAddGeneralComment = function() {
  $('.add-general-comment').on('click', function () {
    $textarea = $(this).parent().siblings('.comment-textarea')
    var commentMessage = $textarea.val();
    var commentableType = $textarea.data('commentable-type')
    var commentableId = $textarea.data('commentable-id')

    $.ajax({
      url: '/comments/',
      method: 'post',
      dataType: 'JSON',
      data: { comment: { commentable_id: commentableId, commentable_type: commentableType, message: commentMessage } },
      error: function(result) {
        document.setFlash(result.responseText)
      },
      success: function(result) {
        $textarea.text('');
        $li = $('.blueprint-comment li').clone();
        $li.find('.comment-message').html(commentMessage)
        $textarea.parent().siblings('.comment-group').append($li);
        $()
      }
    });
  })
};
FlowchartExtended.prototype.bindAddPageComment = function() {
  $(document).on('click', '.add-page-comment', function () {
    $textarea = $(this).parent().siblings('.comment-textarea')
    var commentMessage = $textarea.text();
    var commentableType = $textarea.data('commentable-type')
    var commentableId = $textarea.data('commentable-id')
    $.ajax({
      url: '/comments/',
      method: 'post',
      dataType: 'JSON',
      data: { comment: { commentable_id: commentableId, commentable_type: commentableType, message: commentMessage } },
      error: function(result) {
        document.setFlash(result.responseText)
      },
      success: function(result) {
        $textarea.text('');
        $li = $('.blueprint-comment li').clone();
        $li.find('.comment-message').html(commentMessage)
        $('.comments-page-' + commentableId + ' .comment-group').append($li);
        if (!($('.comments-page-list-'+ commentableId).html()) && $('#page-comments-modal .page .comments-page-' + commentableId).html()) {
          $pageLi = '<li class="comments-page-list-'+ commentableId +'">' + $('#page-comments-modal .page').html() + '</li>'
          $('.general-comments .active-pages-list').append($pageLi);
        };

      }
    });
  })
};
FlowchartExtended.prototype.bindClearComment = function() {
  $(document).on('click', '.clear-textarea', function () {
    $(this).parent().siblings('.comment-input__input').text('');
  })
};

$(function(){
  new FlowchartExtended();
})

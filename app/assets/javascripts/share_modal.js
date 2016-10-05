var ShareModal = function(options) {
  this.inviteCustomMessage = options.inviteCustomMessage;
  this.addMessageLink = options.addMessageLink;
  this.clearMessageLink = options.clearMessageLink;
  this.messagePreview = options.messagePreview
  this.shareSitemapButton = options.shareSitemapButton;
  this.editMessageLink = options.editMessageLink;
  this.commentInputDiv = options.commentInputDiv;
  this.sitemapShareModal = options.sitemapShareModal;
};

ShareModal.prototype.bindEvents = function() {
  var _this = this;
  this.addMessageLink.on('click', function() {
    if(_this.inviteCustomMessage.val().trim().length > 0) {
      _this.inviteCustomMessage.data('send', true);
      _this.messagePreview.find('p:first').html(_this.inviteCustomMessage.val().trim())
      _this.messagePreview.removeClass('hidden')
      _this.commentInputDiv.addClass('hidden')
    }
  })
  this.clearMessageLink.on('click', function() {
    _this.inviteCustomMessage.data('send', false);
    _this.inviteCustomMessage.val('');
    _this.messagePreview.find('p:first').html('')
  })
  this.editMessageLink.on('click', function() {
    _this.inviteCustomMessage.data('send', false);
    _this.messagePreview.find('p:first').html('')
    _this.messagePreview.addClass('hidden')
    _this.commentInputDiv.removeClass('hidden')
  })
  this.shareSitemapButton.on('click', function() {
    var tags = $('.share-emails-input').val().split(',').join(' ')
    if(_this.inviteCustomMessage.data('send')) {
      var customMessage = _this.inviteCustomMessage.val();
    }
    $.ajax({
      url: '/sitemaps/' + _this.sitemapShareModal.data('sitemap-id') + '/share_via_email',
      method: 'post',
      dataType: 'JSON',
      data: { emails: tags, custom_message: (customMessage || '') },
      success: function() {
        document.location.href = document.location.pathname;
      },
      error: function() {
        document.setFlash(result.responseText)
      }
    });
  })
  $('body').on('click', '#show-others', function(e) {
    $('.extra-shared-users').removeClass('hide');
    $(this).addClass('hide');
  })
};

$(function() {
  var options = {
    inviteCustomMessage: $('.share-personal-message'),
    addMessageLink: $('.add-share-message'),
    clearMessageLink: $('.cancel-message'),
    messagePreview: $('.message-preview'),
    shareSitemapButton: $('.share-sitemap-button'),
    editMessageLink: $('.edit-message-link'),
    commentInputDiv: $('.share-comment-input'),
    sitemapShareModal: $('#sitemap-share-modal')
  }
  var shareModal = new ShareModal(options);
  shareModal.bindEvents();
});

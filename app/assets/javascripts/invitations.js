var Invitations = function(options) {
  this.sendInviteButton = options.sendInviteButton;
  this.inviteForm = options.inviteForm;
  this.inviteEmailsInput = options.inviteEmailsInput;
  this.inviteCustomMessage = options.inviteCustomMessage;
  this.addMessageLink = options.addMessageLink;
  this.clearMessageLink = options.clearMessageLink;
  this.messagePreview = options.messagePreview;
  this.editMessageLink = options.editMessageLink;
  this.commentInputDiv = options.commentInputDiv;
};

Invitations.prototype.bindEvents = function() {
  var _this = this;
  this.sendInviteButton.on('click', function() {
    var tags = [];
    $('#myTags .valid-tag .tagit-label').each(function() {
      tags.push(this.innerHTML);
    })
    _this.inviteEmailsInput.val(tags.join(' '));
    if(!_this.inviteCustomMessage.data('send')) {
      _this.inviteCustomMessage.val('');
    }
    _this.inviteForm.submit();
  })
  this.addMessageLink.on('click', function() {
    var message = _this.commentInputDiv.find('.twemoji-textarea').html().trim()
    if(message.length > 0) {
      _this.inviteCustomMessage.data('send', true);
      _this.inviteCustomMessage.val(message);
      _this.messagePreview.find('p:first').html(message)
      _this.messagePreview.removeClass('hidden')
      _this.commentInputDiv.addClass('hidden')
    }
  })
  this.clearMessageLink.on('click', function() {
    _this.inviteCustomMessage.data('send', false);
    _this.inviteCustomMessage.val('');
    _this.commentInputDiv.find('.twemoji-textarea').html('');
    _this.messagePreview.find('p:first').html('')
  })
  this.editMessageLink.on('click', function() {
    _this.inviteCustomMessage.data('send', false);
    _this.messagePreview.find('p:first').html('')
    _this.messagePreview.addClass('hidden')
    _this.commentInputDiv.removeClass('hidden')
  })
};

$(function() {
  var options = {
    sendInviteButton: $('.send-invite-button'),
    inviteForm: $('.bulk-invitation-form'),
    inviteEmailsInput: $('.bulk-invite-emails-input'),
    inviteCustomMessage: $('.invite-custom-message'),
    addMessageLink: $('.add-invite-message'),
    clearMessageLink: $('.clear-custom-message'),
    messagePreview: $('.invite-message-preview'),
    editMessageLink: $('.edit-message-link'),
    commentInputDiv: $('.optional-message-container')
  }
  var invitations = new Invitations(options);
  invitations.bindEvents();
});

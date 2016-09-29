var Invitations = function(options) {
  this.sendInviteButton = options.sendInviteButton;
  this.inviteForm = options.inviteForm;
  this.inviteEmailsInput = options.inviteEmailsInput;
  this.inviteCustomMessage = options.inviteCustomMessage;
  this.addMessageLink = options.addMessageLink;
  this.clearMessageLink = options.clearMessageLink;
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
    if(_this.inviteCustomMessage.val().trim().length > 0) {
      _this.inviteCustomMessage.data('send', true);
      $(this).addClass('hidden');
      _this.clearMessageLink.removeClass('hidden');
    }
  })
  this.clearMessageLink.on('click', function() {
    _this.inviteCustomMessage.data('send', false);
    _this.inviteCustomMessage.val('');
    $(this).addClass('hidden');
    _this.addMessageLink.removeClass('hidden');
  })
};

$(function() {
  var options = {
    sendInviteButton: $('.send-invite-button'),
    inviteForm: $('.bulk-invitation-form'),
    inviteEmailsInput: $('.bulk-invite-emails-input'),
    inviteCustomMessage: $('.invite-custom-message'),
    addMessageLink: $('.add-message'),
    clearMessageLink: $('.clear-custom-message')
  }
  var invitations = new Invitations(options);
  invitations.bindEvents();
});

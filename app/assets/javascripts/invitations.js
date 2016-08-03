var Invitations = function(options) {
  this.sendInviteButton = options.sendInviteButton;
  this.inviteForm = options.inviteForm;
  this.inviteEmailsInput = options.inviteEmailsInput;
};

Invitations.prototype.bindEvents = function() {
  var _this = this;
  this.sendInviteButton.on('click', function() {
    var tags = $('#myTags').tagit('assignedTags')
    _this.inviteEmailsInput.val(tags.join(' '));
    _this.inviteForm.submit();
  })
};


$(function() {
  var options = {
    sendInviteButton: $('.send-invite-button'),
    inviteForm: $('.bulk-invitation-form'),
    inviteEmailsInput: $('.bulk-invite-emails-input')
  }
  var invitations = new Invitations(options);
  invitations.bindEvents();
});

var Invitation = function(options) {
  this.inviteLink = options.inviteLink;
  this.invitationModal = options.invitationModal;
};

Invitation.prototype.bindEvents = function() {
  var _this = this;
  this.inviteLink.on('click', function() {
    _this.invitationModal.modal('show');
  })
};


$(function() {
  var options = {
    inviteLink : $('.new-invitation-link'),
    invitationModal: $('#send_invitation_modal')
  }
  var invitation = new Invitation(options);
  invitation.bindEvents();
});

var Team = function(options) {
  this.inviteLink = options.inviteLink;
  this.inviteModal = options.inviteModal;
};

Team.prototype.bindEvents = function() {
  var _this = this;
  this.inviteLink.on('click', function(e) {
    e.preventDefault();
    _this.inviteModal.find('form').attr('action', $(this).data('url'));
    _this.inviteModal.find('form').find('input#stripe_plan_id').val(PRO_STRIPE_ID);
    _this.inviteModal.modal('show');
  });

};

$(function() {
  var options = {
    inviteLink : $('.invite-link'),
    inviteModal: $('#invite-user-modal')
  }
  new Team(options).bindEvents();
});

var Team = function(options) {
  this.inviteLink = options.inviteLink;
  this.inviteModal = options.inviteModal;
  this.trialStarterUserOnInvite = options.trialStarterUserOnInvite;
  this.trialStarterUserOnSwitchPlan = options.trialStarterUserOnSwitchPlan;
};

Team.prototype.bindEvents = function() {
  var _this = this;
  this.inviteLink.on('click', function(e) {
    e.preventDefault();
    _this.inviteModal.find('form').attr('action', $(this).data('url'));
    _this.inviteModal.find('form .bulk-invite-emails-input').attr('required', true);
    _this.inviteModal.find('form').find('input#stripe_plan_id').val(PRO_STRIPE_ID);
    _this.inviteModal.find('.go-back').addClass('hide');
    _this.trialStarterUserOnSwitchPlan.addClass('hide');
    _this.trialStarterUserOnInvite.removeClass('hide');
    _this.inviteModal.modal('show');
  });

};

$(function() {
  var options = {
    inviteLink : $('.invite-link'),
    inviteModal: $('#invite-user-modal'),
    trialStarterUserOnInvite : $('p.trial-starter-user-on-invite'),
    trialStarterUserOnSwitchPlan : $('p.trial-starter-user-on-switch-plan')
  }
  new Team(options).bindEvents();
});

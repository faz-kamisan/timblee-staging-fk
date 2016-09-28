var Plan = function(options) {
  this.addNewCard = options.addNewCard;
  this.useSavedCard = options.useSavedCard;
  this.cardErrors = options.cardErrors;
  this.brandSpan = options.brandSpan;
  this.confirmSavedCard = options.confirmSavedCard;
  this.proPlanModal = options.proPlanModal;
  this.inviteUserModal = options.inviteUserModal;
  this.editableInput = options.editableInput;
  this.settingsForm = options.settingsForm;
  this.trialStarterUserOnInvite = options.trialStarterUserOnInvite;
  this.trialStarterUserOnSwitchPlan = options.trialStarterUserOnSwitchPlan;

};

Plan.prototype.bindEvents = function() {
  var _this = this;
  this.useSavedCard.on('click', function() {
    var $parent = $(this).closest(_this.settingsForm);
    $('.old-card-info').addClass('show');
    $('.old-card-info').removeClass('hide');
    $('.new-card').addClass('hide');
    $('.new-card').removeClass('show');
    _this.cardErrors.html('');
    $parent.find(_this.editableInput).attr('disabled', true);
    $parent.find(_this.editableInput).val('');
    $parent.find(_this.brandSpan).removeClass('visa mastercard amex');
  });

  this.addNewCard.on('click', function() {
    var $parent = $(this).closest(_this.settingsForm);
    $('.old-card-info').addClass('hide');
    $('.old-card-info').removeClass('show');
    $('.new-card').addClass('show');
    $('.new-card').removeClass('hide');
    $parent.find(_this.editableInput).attr('disabled', false);
  });

  this.confirmSavedCard.on('click', function(e) {
    e.preventDefault();
    _this.proPlanModal.modal('hide');
    _this.inviteUserModal.find('form').attr('action', $(this).data('url'));
    _this.inviteUserModal.find('form').find('input#stripe_plan_id').val(PRO_STRIPE_ID);
    _this.inviteUserModal.modal('show');
    _this.inviteUserModal.find('.go-back').removeClass('hide');
    _this.trialStarterUserOnSwitchPlan.removeClass('hide');
    _this.trialStarterUserOnInvite.addClass('hide');
  });

};


$(function() {
  var options = {
    cardErrors : $('.cc-errors'),
    brandSpan : $('.cc-brand'),
    confirmSavedCard : $('#confirm-saved-card'),
    proPlanModal : $('#pro-plan-modal'),
    inviteUserModal : $('#invite-user-modal'),
    editableInput : $('.default-input'),
    settingsForm : $('form.settings-form'),
    addNewCard : $('#add-new-card'),
    useSavedCard : $('#use-saved-card'),
    trialStarterUserOnInvite : $('p.trial-starter-user-on-invite'),
    trialStarterUserOnSwitchPlan : $('p.trial-starter-user-on-switch-plan')
  }
  new Plan(options).bindEvents();
});

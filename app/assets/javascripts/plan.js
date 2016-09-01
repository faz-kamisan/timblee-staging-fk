var ProPlan = function(options) {
  this.addNewCard = options.addNewCard;
  this.useSavedCard = options.useSavedCard;
  this.cardErrors = options.cardErrors;
  this.confirmSavedCard = options.confirmSavedCard;
  this.proPlanModal = options.proPlanModal;
  this.inviteUserModal = options.inviteUserModal;

};

ProPlan.prototype.bindEvents = function() {
  var _this = this;
  this.useSavedCard.on('click', function() {
    $('.old-card-info').addClass('show');
    $('.old-card-info').removeClass('hide');
    $('.new-card').addClass('hide');
    $('.new-card').removeClass('show');
    _this.cardErrors.html('');
  });

  this.addNewCard.on('click', function() {
    $('.old-card-info').addClass('hide');
    $('.old-card-info').removeClass('show');
    $('.new-card').addClass('show');
    $('.new-card').removeClass('hide');
  });

  this.confirmSavedCard.on('click', function(e) {
    e.preventDefault();
    _this.proPlanModal.modal('hide');
    _this.inviteUserModal.modal('show');
  });

};


$(function() {
  var options = {
    cardErrors : $('.cc-errors'),
    confirmSavedCard : $('#confirm-saved-card'),
    proPlanModal : $('#pro-plan-modal'),
    inviteUserModal : $('#invite-user-modal'),
    addNewCard : $('#add-new-card'),
    useSavedCard : $('#use-saved-card')
  }
  new ProPlan(options).bindEvents();
});

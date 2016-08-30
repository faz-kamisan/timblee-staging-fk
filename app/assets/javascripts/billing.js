var Billing = function(options) {
  this.cardNumber = options.cardNumber;
  this.brandSpan = options.brandSpan;
  this.cardDetailsrowOnEdit = options.cardDetailsrowOnEdit;
  this.cardDetailsrowOnSave = options.cardDetailsrowOnSave;
  this.cardFormDiv = options.cardFormDiv;
  this.btn_edit = options.btn_edit;
  this.btn_cancel = options.btn_cancel;
  this.cardErrors = options.cardErrors;
  this.cardCVV = options.cardCVV;
  this.starterErrorButton = options.starterErrorButton;
  this.starterModal = options.starterModal;
  this.starterErrorModal = options.starterErrorModal;
  this.expField = options.expField;
};

Billing.prototype.bindEvents = function() {
  this.addCardType();
  this.toggleCardInputFields();
  this.cardCVV.on('focus', function() {
    $(this).val('');
  });
  this.bindDowngradeErrorEvent();
  this.bindExpFieldEvent();
};

Billing.prototype.bindExpFieldEvent = function() {
  this.expField.on('keypress keyup', function (e) {
    if(e.keyCode > 47 && e.keyCode <= 57) {
      if(this.value.length > 4) {
        e.preventDefault();
      } else if(this.value.length == 2){
        this.value = this.value + '/';
      };
    } else {
      e.preventDefault();
    }
  });
};

Billing.prototype.bindDowngradeErrorEvent = function() {
  var _this = this;
  this.starterErrorButton.on('click', function(e) {
    e.preventDefault();
    _this.starterModal.modal('hide');
    _this.starterErrorModal.modal('show');
  });
};

Billing.prototype.addCardType = function() {
  var _this = this;
  this.cardNumber.on('input', function() {
    _this.brandSpan.removeClass('visa mastercard amex');
    _this.brandSpan.addClass($.payment.cardType(this.value));
  })
};

Billing.prototype.toggleCardInputFields = function() {
  var _this = this;
  this.btn_edit.on('click', function() {
    _this.cardDetailsrowOnEdit.removeClass('hide');
    _this.cardDetailsrowOnSave.addClass('hide');
    _this.cardFormDiv.removeClass('hide');
  });

  this.btn_cancel.on('click', function() {
    _this.cardDetailsrowOnEdit.addClass('hide');
    _this.cardDetailsrowOnSave.removeClass('hide');
    _this.cardFormDiv.addClass('hide');
    _this.cardErrors.html('');
    _this.brandSpan.html('');
  });
};

$(function() {
  var options = {
    cardNumber : $('.cc-number'),
    brandSpan : $('.cc-brand'),
    cardDetailsrowOnEdit : $('.cc-row-on-edit'),
    cardDetailsrowOnSave : $('.cc-row-on-save'),
    cardFormDiv : $('.cc-add'),
    btn_edit : $('.btn-to-edit'),
    btn_cancel : $('.btn-to-cancel'),
    cardErrors : $('.cc-errors'),
    cardCVV : $('.cc-cvv'),
    starterErrorButton : $('#starter-error'),
    starterModal : $('#starter-plan-modal'),
    starterErrorModal : $('#pro-plan-message-modal'),
    expField : $('.cc-exp')
  }
  new Billing(options).bindEvents();
});

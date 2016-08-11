var Billing = function(options) {
  this.cardNumber = options.cardNumber;
  this.brandSpan = options.brandSpan;
  this.cardDetailsOnEdit = options.cardDetailsOnEdit;
  this.cardDetailsOnSave = options.cardDetailsOnSave;
  this.cardFormDiv = options.cardFormDiv;
  this.btn_edit = options.btn_edit;
  this.btn_cancel = options.btn_cancel;
  this.cardErrors = options.cardErrors;
  this.cardBrand = options.cardBrand;
};

Billing.prototype.bindEvents = function() {
  this.addCardType();
  this.toggleCardInputFields();
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
    _this.cardDetailsOnEdit.removeClass('hide');
    _this.cardDetailsOnSave.addClass('hide');
    _this.cardFormDiv.removeClass('hide');
  });

  this.btn_cancel.on('click', function() {
    _this.cardDetailsOnEdit.addClass('hide');
    _this.cardDetailsOnSave.removeClass('hide');
    _this.cardFormDiv.addClass('hide');
    _this.cardErrors.html('');
    _this.cardBrand.html('');
  });
};

$(function() {
  var options = {
    cardNumber : $('.cc-number'),
    brandSpan : $('.cc-brand'),
    cardDetailsOnEdit : $('.cc-detail-edit'),
    cardDetailsOnSave : $('.cc-detail-save'),
    cardFormDiv : $('.cc-add'),
    btn_edit : $('.btn-edit'),
    btn_cancel : $('.btn-cancel'),
    cardErrors : $('.cc-errors'),
    cardBrand : $('.cc-brand')
  }
  new Billing(options).bindEvents();
});

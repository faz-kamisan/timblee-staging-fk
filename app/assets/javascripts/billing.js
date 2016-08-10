var Billing = function(options) {
  this.card_number = options.card_number;
  this.brand_span = options.brand_span;
  this.card_details_on_edit = options.card_details_on_edit;
  this.card_details_on_save = options.card_details_on_save;
  this.card_form_div = options.card_form_div;
  this.btn_edit = options.btn_edit;
  this.btn_cancel = options.btn_cancel;
  this.card_errors = options.card_errors;
  this.card_brand = options.card_brand;
};

Billing.prototype.bindEvents = function() {
  this.addCardType();
  this.toggleCardInputFields();
};

Billing.prototype.addCardType = function() {
  var _this = this;
  this.card_number.on('input', function() {
    _this.brand_span.html($.payment.cardType(this.value))
  })
};

Billing.prototype.toggleCardInputFields = function() {
  var _this = this;
  this.btn_edit.on('click', function() {
    _this.card_details_on_edit.removeClass('hide');
    _this.card_details_on_save.addClass('hide');
    _this.card_form_div.removeClass('hide');
  });

  this.btn_cancel.on('click', function() {
    _this.card_details_on_edit.addClass('hide');
    _this.card_details_on_save.removeClass('hide');
    _this.card_form_div.addClass('hide');
    _this.card_errors.html('');
    _this.card_brand.html('');
  });
};

$(function() {
  var options = {
    card_number : $('.cc-number'),
    brand_span : $('.cc-brand'),
    card_details_on_edit : $('.cc-detail-edit'),
    card_details_on_save : $('.cc-detail-save'),
    card_form_div : $('.cc-add'),
    btn_edit : $('.btn-edit'),
    btn_cancel : $('.btn-cancel'),
    card_errors : $('.cc-errors'),
    card_brand : $('.cc-brand')
  }
  new Billing(options).bindEvents();
});

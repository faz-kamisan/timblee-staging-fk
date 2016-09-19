var Personalization = function(options) {
  this.btnCancel = options.btnCancel;
  this.btnEdit = options.btnEdit;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.logoField = options.logoField;
  this.chooseLogo = options.chooseLogo;
};

Personalization.prototype.bindEvents = function() {
  var _this = this;
  this.btnEdit.on('click', function() {
    _this.rowEdit.removeClass('hide');
  });

  this.btnCancel.on('click', function() {
    _this.rowSave.removeClass('hide');
    _this.rowEdit.addClass('hide');
    _this.logoField.val('');
  });

  this.chooseLogo.on('click', function() {
    _this.logoField.click();
  });
};


$(function() {
  var options = {
    btnCancel : $('.btn-cancel-edit-logo'),
    btnEdit : $('.btn-edit-logo'),
    rowSave : $('.row-logo-save'),
    rowEdit : $('.row-logo-edit'),
    logoField : $('.logo-field'),
    chooseLogo : $('.choose-logo')
  }
  new Personalization(options).bindEvents();
});

var Personalization = function(options) {
  this.btnCancel = options.btnCancel;
  this.btnEdit = options.btnEdit;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.logoField = options.logoField;
};

Personalization.prototype.bindEvents = function() {
  var _this = this;
  this.btnEdit.on('click', function() {
    _this.rowEdit.removeClass('hide');
    _this.rowSave.addClass('hide');
  });

  this.btnCancel.on('click', function() {
    _this.rowSave.removeClass('hide');
    _this.rowEdit.addClass('hide');
    _this.logoField.val('');
  });
};


$(function() {
  var options = {
    btnCancel : $('.btn-cancel-edit-logo'),
    btnEdit : $('.btn-edit-logo'),
    rowSave : $('.row-logo-save'),
    rowEdit : $('.row-logo-edit'),
    logoField : $('.logo-field'),
  }
  new Personalization(options).bindEvents();
});

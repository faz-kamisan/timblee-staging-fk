var Personalization = function(options) {
  this.btnCancel = options.btnCancel;
  this.btnEdit = options.btnEdit;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.logoField = options.logoField;
  this.chooseLogo = options.chooseLogo;
  this.removeImage = options.removeImage;
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
    _this.chooseLogo.attr('src', _this.chooseLogo.data('original-value'))
  });

  this.removeImage.on('click', function() {
    _this.removeImage.addClass('hide');
    _this.logoField.val('');
    _this.chooseLogo.attr('src', _this.chooseLogo.data('original-value'))
  });

  this.chooseLogo.on('click', function() {
    _this.logoField.click();
  });

  this.logoField.change(function(){
    _this.readURL(this);
    _this.removeImage.removeClass('hide');
  });
};

Personalization.prototype.readURL = function(input) {
  var _this = this;
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      _this.chooseLogo.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
};

$(function() {
  var options = {
    btnCancel : $('.btn-cancel-edit-logo'),
    btnEdit : $('.btn-edit-logo'),
    rowSave : $('.row-logo-save'),
    rowEdit : $('.row-logo-edit'),
    logoField : $('.logo-field'),
    chooseLogo : $('.choose-logo'),
    removeImage : $('.remove-image')
  }
  new Personalization(options).bindEvents();
});

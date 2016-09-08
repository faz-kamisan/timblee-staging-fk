var MyInfo = function(options) {
  this.btnCancel = options.btnCancel;
  this.btnEdit = options.btnEdit;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.avatarLink = options.avatarLink;

};

MyInfo.prototype.bindEvents = function() {
  var _this = this;
  this.btnEdit.on('click', function() {
    _this.rowEdit.removeClass('hide');
    _this.rowSave.addClass('hide');
  });

  this.btnCancel.on('click', function() {
    _this.rowSave.removeClass('hide');
    _this.rowEdit.addClass('hide');
  });

};


$(function() {
  var options = {
    btnCancel : $('.btn-cancel-edit-avatar'),
    btnEdit : $('.btn-edit-avatar'),
    rowSave : $('.row-avatar-save'),
    rowEdit : $('.row-avatar-edit'),
    avatarLink : $('.avatar-link')
  }
  new MyInfo(options).bindEvents();
});

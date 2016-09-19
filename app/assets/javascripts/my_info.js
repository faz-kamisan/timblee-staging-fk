var MyInfo = function(options) {
  this.btnCancel = options.btnCancel;
  this.btnEdit = options.btnEdit;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.avatarLink = options.avatarLink;
  this.avatarField = options.avatarField;
  this.defaultAvatars = options.defaultAvatars;
  this.previewProfileImage = options.previewProfileImage;
  this.eyeClose = options.eyeClose;
  this.eyeOpen = options.eyeOpen;
  this.passwordField = options.passwordField;
};

MyInfo.prototype.bindEvents = function() {
  var _this = this;
  this.btnEdit.on('click', function() {
    _this.rowEdit.removeClass('hide');
  });

  this.btnCancel.on('click', function() {
    _this.rowSave.removeClass('hide');
    _this.rowEdit.addClass('hide');
    _this.avatarField.val('');
    _this.defaultAvatars.attr('checked', false);
    _this.previewProfileImage.attr('src', _this.previewProfileImage.data('original-value'))
  });

  this.avatarField.change(function(){
      _this.readURL(this);
      _this.defaultAvatars.attr('checked', false);
  });

  this.avatarLink.on('click', function() {
    _this.previewProfileImage.attr('src', this.src);
    _this.avatarField.val('');
  });

  this.previewProfileImage.on('click', function() {
    _this.avatarField.click();
  })

  this.eyeOpen.on('click', function() {
    _this.passwordField.attr('type', 'text');
    $(this).addClass('hide');
    _this.eyeClose.removeClass('hide');
  });

  this.eyeClose.on('click', function() {
    _this.passwordField.attr('type', 'password');
    $(this).addClass('hide');
    _this.eyeOpen.removeClass('hide');
  });
};

MyInfo.prototype.readURL = function(input) {
  var _this = this;
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      _this.previewProfileImage.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
};


$(function() {
  var options = {
    btnCancel : $('.btn-cancel-edit-avatar'),
    btnEdit : $('.btn-edit-avatar'),
    rowSave : $('.row-avatar-save'),
    rowEdit : $('.row-avatar-edit'),
    avatarLink : $('.avatar-link'),
    avatarField : $('.avatar-field'),
    defaultAvatars : $('.default_avatars'),
    previewProfileImage : $('.preview-profile-image'),
    passwordField : $('input.hidden-password'),
    eyeOpen : $('.icon-eye-open'),
    eyeClose : $('.icon-eye-close')
  }
  new MyInfo(options).bindEvents();
});

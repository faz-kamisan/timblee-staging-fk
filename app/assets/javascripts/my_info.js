var MyInfo = function(options) {
  this.btnCancelAvatar = options.btnCancelAvatar;
  this.btnCancelPassword = options.btnCancelPassword;
  this.btnEditAvatar = options.btnEditAvatar;
  this.rowSave = options.rowSave;
  this.rowEdit = options.rowEdit;
  this.avatarLink = options.avatarLink;
  this.avatarField = options.avatarField;
  this.defaultAvatars = options.defaultAvatars;
  this.previewProfileImage = options.previewProfileImage;
  this.eyeClose = options.eyeClose;
  this.eyeOpen = options.eyeOpen;
  this.passwordField = options.passwordField;
  this.eyesIcons = options.eyesIcons;
  this.removeImage = options.removeImage;
};

MyInfo.prototype.bindEvents = function() {
  var _this = this;
  this.btnEditAvatar.on('click', function() {
    _this.rowEdit.removeClass('hide');
    _this.rowSave.addClass('hide');
  });

  this.btnCancelAvatar.on('click', function() {
    _this.rowSave.removeClass('hide');
    _this.rowEdit.addClass('hide');
    _this.avatarField.val('');
    _this.defaultAvatars.attr('checked', false);
    _this.previewProfileImage.attr('src', _this.previewProfileImage.data('original-value'))
  });

  this.btnCancelPassword.on('click', function() {
    _this.eyesIcons.addClass('hide');
  });

  this.avatarField.change(function(){
    _this.readURL(this);
    _this.defaultAvatars.attr('checked', false);
  });

  this.removeImage.on('click', function() {
    _this.removeImage.addClass('hide');
    _this.avatarField.val('');
    _this.defaultAvatars.attr('checked', false);
    _this.previewProfileImage.attr('src', _this.previewProfileImage.data('original-value'))
  });

  this.avatarField.change(function(){
      _this.readURL(this);
      _this.defaultAvatars.attr('checked', false);
      _this.removeImage.removeClass('hide');
  });

  this.avatarLink.on('click', function() {
    _this.previewProfileImage.attr('src', this.src);
    _this.avatarField.val('');
    _this.removeImage.removeClass('hide');
  });

  this.previewProfileImage.on('click', function() {
    _this.avatarField.click();
  })

  this.eyeOpen.on('click', function() {
    _this.passwordField.attr('type', 'text');
    $(this).addClass('hide');
    _this.eyeClose.removeClass('hide');
    _this.passwordField.focus();
  });

  this.eyeClose.on('click', function() {
    _this.passwordField.attr('type', 'password');
    $(this).addClass('hide');
    _this.eyeOpen.removeClass('hide');
    _this.passwordField.focus();
  });

  this.passwordField.on('input', function(){
    if($(this).val().length == 0) {
      _this.eyesIcons.addClass('hide');
    } else {
      _this.eyesIcons.removeClass('hide');
    }
  })
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
    btnCancelAvatar : $('.btn-cancel-edit-avatar'),
    btnCancelPassword : $('.btn-cancel-edit-password'),
    btnEditAvatar : $('.btn-edit-avatar'),
    rowSave : $('.row-avatar-save'),
    rowEdit : $('.row-avatar-edit'),
    avatarLink : $('.avatar-link'),
    avatarField : $('.avatar-field'),
    defaultAvatars : $('.default_avatars'),
    previewProfileImage : $('.preview-profile-image'),
    passwordField : $('input.hidden-password'),
    eyeOpen : $('.icon-eye-open'),
    eyeClose : $('.icon-eye-close'),
    eyesIcons : $('.eyes-icons'),
    removeImage : $('.remove-image')
  }
  new MyInfo(options).bindEvents();
});

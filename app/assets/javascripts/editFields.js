var EditFields = function(options) {
  this.editBtn = options.editBtn;
  this.cancelBtn = options.cancelBtn;
  this.settingsForm = options.settingsForm;
  this.emailNotificationCheckbox = options.emailNotificationCheckbox;
  this.save = options.save;
  this.edit = options.edit;
  this.editableInput = options.editableInput;
  this.fadeTime = options.fadeTime;
};

EditFields.prototype.showEdit = function() {
  var _this = this;
  this.editBtn.on('click', function() {
    var $this = $(this),
        $parent = $this.closest(_this.settingsForm);
    $parent.find(_this.edit).fadeOut(_this.fadeTime);
    $parent.find(_this.save).fadeIn(_this.fadeTime);
    $parent.find(_this.editableInput).attr('disabled', false).focus();
  });
};

EditFields.prototype.hideEdit = function() {
  var _this = this;
  this.cancelBtn.on('click', function() {
    var $this = $(this),
        $parent = $this.closest(_this.settingsForm),
        $relatedInput = $parent.find('.editable-input');
    if($this.hasClass('role-select-cancel')) {
      _this.setOriginalRole($this)
    }
    $relatedInput.val($relatedInput.data('original-value'));
    $parent.find(_this.save).fadeOut(_this.fadeTime);
    $parent.find(_this.edit).fadeIn(_this.fadeTime);
    $parent.find(_this.editableInput).attr('disabled', true);
  });
};


EditFields.prototype.setOriginalRole = function(obj) {
  var isAdmin = $('.user-roles-input').data('original-role');
  if(isAdmin) {
    $('#user_is_admin_false').removeProp('checked');
    $('#user_is_admin_true').prop('checked', 'checked');
  } else {
    $('#user_is_admin_true').removeProp('checked');
    $('#user_is_admin_false').prop('checked', 'checked');
  }
};

EditFields.prototype.bindEvents = function() {
  this.showEdit();
  this.hideEdit();
  this.emailNotificationCheckbox.on('change', function() {
    $.ajax({
      method: 'put',
      url: '/users/',
      data: { user: { notify_by_email: this.checked } },
      dataType: 'script'
    });
  })
};

$(function() {
  var options = {
    editBtn : $('.btn-edit'),
    cancelBtn : $('.btn-cancel'),
    settingsForm : $('.settings-form'),
    emailNotificationCheckbox: $('.email-notification-checkbox'),
    save : $('.save'),
    edit : $('.edit'),
    editableInput : $('.editable-input'),
    fadeTime : 500
  },

  editFields = new EditFields(options);
  editFields.bindEvents();
});

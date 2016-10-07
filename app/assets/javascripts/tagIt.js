var TagIt = function(options) {
  this.myTags = options.myTags;
  this.addedProUsersCount = options.addedProUsersCount;
  this.newProCharges = options.newProCharges;
  this.errorsDiv = options.errorsDiv;
};

TagIt.prototype.isEmail = function(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

TagIt.prototype.afterTagAdded = function(event, ui) {
  var _this = this;
  var tagValue = ui.tag.find('input').val();
  if (!_this.isEmail(tagValue)){
    _this.myTags.tagit("removeTagByLabel", tagValue);
  } else {
    $.ajax({
      url: _this.myTags.data('url'),
      dataType: 'json',
      data: { 'email': tagValue },

      success: function (data) {
        _this.successCallbackForTagAdd(data, ui);
      }
    });

    this.myTags.data("ui-tagit").tagInput.attr('placeholder', '')
  }
};

TagIt.prototype.successCallbackForTagAdd = function(data, ui) {
  var _this = this;
  if(data.existing_email){
    ui.tag.addClass("invalid-tag");
  } else {
    ui.tag.addClass("valid-tag");
    var numberOfUsers = parseInt(_this.addedProUsersCount.data('total-users-count')) + 1,
      numberOfAddedUsers = parseInt(_this.addedProUsersCount.html()) + 1,
      monthlyCharge = (CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (numberOfUsers - 1)));
      if(numberOfAddedUsers == 1){
        numberOfAddedUsers += ' user'
      }else {
        numberOfAddedUsers += ' users'
      }
    _this.addedProUsersCount.data('total-users-count', numberOfUsers);
    _this.addedProUsersCount.html(numberOfAddedUsers);
    _this.newProCharges.html(monthlyCharge);
  }
  _this.add_errors();
};

TagIt.prototype.afterTagRemoved = function(event, ui) {
  var _this = this;
  if(ui.tag.hasClass('valid-tag')) {
    var numberOfUsers = parseInt(_this.addedProUsersCount.data('total-users-count')) - 1,
      numberOfAddedUsers = parseInt(_this.addedProUsersCount.html()) - 1,
      monthlyCharge = (CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (numberOfUsers - 1)));
      if(numberOfAddedUsers == 1){
        numberOfAddedUsers += ' user'
      }else {
        numberOfAddedUsers += ' users'
      }
    _this.addedProUsersCount.html(numberOfAddedUsers);
    _this.addedProUsersCount.data('total-users-count', numberOfUsers);
    _this.newProCharges.html(monthlyCharge);
  }
  _this.add_errors();

  if(_this.myTags.tagit('assignedTags').length == 0) {
    _this.myTags.data("ui-tagit").tagInput.attr('placeholder', 'Enter their emails seperated by commas.')
    _this.errorsDiv.hide();
  }

};

TagIt.prototype.add_errors = function() {
  var _this = this;
  if (_this.myTags.find('.valid-tag').length == 0 && _this.myTags.find('.invalid-tag').length != 0){
    _this.errorsDiv.show();
    _this.errorsDiv.html('All email(s) you entered here are already present in our database.')
  } else if(_this.myTags.find('.invalid-tag').length != 0) {
    _this.errorsDiv.show();
    _this.errorsDiv.html('Some email(s) you entered here are already present in our database.')
  } else {
    _this.errorsDiv.hide();
  }
};

TagIt.prototype.bindEvents = function() {
  var _this = this;
  _this.myTags.tagit({
    placeholderText: 'Enter their emails seperated by commas.',
    afterTagAdded: function(event, ui) {
      _this.afterTagAdded(event, ui);
    },
    afterTagRemoved: function (event, ui) {
      _this.afterTagRemoved(event, ui)
    }
  });
};

$(function() {
  var options = {
    myTags : $("#myTags"),
    addedProUsersCount : $('.added-pro-users-count'),
    newProCharges : $('.new-pro-charges'),
    errorsDiv : $('.tags-error')
  },
  tagIt = new TagIt(options);
  tagIt.bindEvents();
});

var DeleteUser = function(options) {
  this.deleteUserLink = options.deleteUserLink;
  this.userModalLink = options.userModalLink;
  this.userNameSpan = options.userNameSpan;
};

DeleteUser.prototype.bindEvents = function() {
  var _this = this;
  this.userModalLink.on('click', function() {
    deleteUserUrl = $(this).data('url');
    deleteUserName = $(this).data('name');
    _this.deleteUserLink.attr('href', deleteUserUrl);
    _this.userNameSpan.html(deleteUserName);
  })
};


$(function() {
  var options = {
    deleteUserLink : $('#delete-user-link'),
    userModalLink: $('.delete-user-modal-link'),
    userNameSpan: $('.user-name-to-delete span')
  }
  var delete_user = new DeleteUser(options);
  delete_user.bindEvents();
});

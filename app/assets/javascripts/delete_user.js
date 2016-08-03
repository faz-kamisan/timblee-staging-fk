var DeleteUser = function(options) {
  this.delete_user_link = options.delete_user_link;
  this.user_modal_link = options.user_modal_link;
};

DeleteUser.prototype.bindEvents = function() {
  var _this = this;
  this.user_modal_link.on('click', function() {
    delete_user_url = $(this).data('url');
    _this.delete_user_link.attr('href', delete_user_url);
  })
};


$(function() {
  var options = {
    delete_user_link : $('#delete-user-link'),
    user_modal_link: $('.delete-user-modal-link')
  }
  var delete_user = new DeleteUser(options);
  delete_user.bindEvents();
});

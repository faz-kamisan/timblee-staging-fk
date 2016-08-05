var DeleteUser = function(options) {
  this.delete_user_link = options.delete_user_link;
  this.user_modal_link = options.user_modal_link;
  this.user_name_span = options.user_name_span;
};

DeleteUser.prototype.bindEvents = function() {
  var _this = this;
  this.user_modal_link.on('click', function() {
    delete_user_url = $(this).data('url');
    delete_user_name = $(this).data('name');
    _this.delete_user_link.attr('href', delete_user_url);
    _this.user_name_span.html(delete_user_name);
  })
};


$(function() {
  var options = {
    delete_user_link : $('#delete-user-link'),
    user_modal_link: $('.delete-user-modal-link'),
    user_name_span: $('.user-name-to-delete span')
  }
  var delete_user = new DeleteUser(options);
  delete_user.bindEvents();
});

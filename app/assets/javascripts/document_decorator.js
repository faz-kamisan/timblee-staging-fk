Document.prototype.setFlash = function(message) {
  var $flash = $('<div>', { class: 'flash' });
  var $messageDiv = $('<div>', { class: 'message' });
  $messageDiv.append('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  $messageDiv.append($('<span>', { html: message }));
  $flash.append($messageDiv);
  $("div.flash-message").html('');
  $("div.flash-message").append($flash);
}

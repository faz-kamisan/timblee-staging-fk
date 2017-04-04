function Notification(options) {
  this.notificationlist = options.notificationlist;
  this.loading = options.loading;
}

Notification.prototype.bindEvents = function() {
  var _this = this;
  this.notificationlist.scroll(function (e) {
    var $this = $(this);
    if($this.data('has-more') && ($this.scrollTop() +  $this.innerHeight()  >  this.scrollHeight - 15)) {
      _this.loading.css('display', 'block')
      var offset = parseInt(this.dataset['offset']) + 5;
      $this.attr('data-offset', offset)
       $.ajax({
        url: this.dataset.url,
        dataType: 'script',
        data: { 'offset': this.dataset.offset },
        complete: function () {
          _this.loading.css('display', 'none');
        }
      });
    }
  });
};

$(function () {
  var options = {
    notificationlist : $('.notifications-listing'),
    loading : $('.loading-image')
  };
  new Notification(options).bindEvents();
});

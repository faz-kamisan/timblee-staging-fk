var Progress = function(options) {
  this.dragulaContainers = options.dragulaContainers;
};

Progress.prototype.init = function() {
  dragula(this.dragulaContainers.toArray(), {
    revertOnSpill: true,
    accepts: function (el, target, source) {
      return(target != source);
    }
  }).on('drop', function(el, target, source, sibling) {
    $.ajax({
      method: 'put',
      url: '/site_maps/' + el.dataset['id'],
      data: { site_map: { state: target.dataset['state'] } },
      dataType: 'script'
    });
  })
};


$(function() {
  var options = {
    dragulaContainers : $('.dragula_container')
  }
  var progress = new Progress(options);
  progress.init();
});

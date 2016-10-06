var Progress = function() {
};

Progress.prototype.init = function() {
  var _this = this;
  this.setDropContainerHeight();
  var drake = dragula([document.getElementById('on-hold-holder'), document.getElementById('in-progress-holder'), document.getElementById('review-holder'), document.getElementById('approved-holder')]);
  drake.on('drop', function(dropped, droppedOn, droppedFrom, nextSibling) {
    var $dropped = $(dropped);
    var $droppedOn = $(droppedOn);
    var $droppedFrom = $(droppedFrom);
    // Update Sitemap State

    var sourceContainer = $droppedFrom.closest('.drop_container')
    var destinationContainer = $droppedOn.closest('.drop_container')
    if(destinationContainer.find('.sitemap-tile').length == 1) {
      var position = 1
    } else {
      var $nextSibling = $(nextSibling);
      if(!nextSibling || $nextSibling.hasClass('empty-sitemap-holder')) {
        var $destinationContainerSitemaps = $droppedOn.find('.sitemap-tile')
        var position = $($destinationContainerSitemaps[$destinationContainerSitemaps.length - 2]).data('position') + 1
      } else {
        var position = $nextSibling.data('position')
      }
    }
    var updatedAt = new Date,
        day = ("0" + updatedAt.getDate()).slice(-2),
        month = updatedAt.toLocaleString('en-us', { month: "short" }),
        year = updatedAt.getFullYear(),
        updatedAtFormatted = month + ' ' + day + ', ' + year;
    $dropped.find('.last-updated').data('original-last-updated', $dropped.find('.last-updated').html());
    $dropped.find('.last-updated').html('Last updated ' + updatedAtFormatted);
    _this.setSitemapCount(destinationContainer, sourceContainer);
    _this.setPositionForSitemapTiles(destinationContainer, sourceContainer);
    _this.checkContainerIsEmpty(destinationContainer);
    _this.checkContainerIsEmpty(sourceContainer);
    _this.setDropContainerHeight();
    $.ajax({
      method: 'put',
      url: '/sitemaps/' + $dropped.data('id'),
      data: { sitemap: { state: destinationContainer.data('state'), position: position } },
      dataType: 'script',
      error: function() {
        $dropped.parent('.drag-wrapper').detach().prependTo(sourceContainer.find('.sitemap_container'));
        $dropped.find('.last-updated').html($dropped.find('.last-updated').data('original-last-updated'));
        _this.setSitemapCount(sourceContainer, $droppedOn);
        _this.checkContainerIsEmpty($droppedOn);
        _this.checkContainerIsEmpty(sourceContainer);
      }
    });
  })
};

Progress.prototype.checkContainerIsEmpty = function(container) {
  if(container.find('.drag-wrapper').length > 0) {
    container.find('.empty-sitemap-holder').addClass('hidden')
  } else {
    container.find('.empty-sitemap-holder').removeClass('hidden')
  }
}

Progress.prototype.setPositionForSitemapTiles = function(targetContainer, sourceContainer) {
  this.setPositionForSitemapTile(targetContainer);
  this.setPositionForSitemapTile(sourceContainer);
}

Progress.prototype.setPositionForSitemapTile = function(container) {
  container.find('.sitemap-tile').each(function(index, sitemapTile) {
    $(sitemapTile).data('position', index + 1)
    $(sitemapTile).attr('data-position', index + 1)
  })
}

Progress.prototype.setSitemapCount = function(targetContainer, sourceContainer) {
  this.calculateAndSetSitemapCount(targetContainer, 'add');
  this.calculateAndSetSitemapCount(sourceContainer, 'subtract');
}

Progress.prototype.setDropContainerHeight = function() {
  $('.sitemap_container').height($('.drop_container').height() - 125)
}

Progress.prototype.calculateAndSetSitemapCount = function(container, method) {
  var sitemapCountContainer = container.find('.sitemap-count')
  var count = sitemapCountContainer.data('count');
  if(method == 'add') {
    var newCount = ++count
  } else if(method == 'subtract') {
    var newCount = --count
  } else {
    return
  }
  sitemapCountContainer.data('count', newCount);
  sitemapCountContainer.attr('data-count', newCount);
  if(newCount == 1) {
    sitemapCountContainer.html(newCount + ' Sitemap');
  } else {
    sitemapCountContainer.html(newCount + ' Sitemaps');
  }
}

$(function() {
  var progress = new Progress();
  progress.init();
});

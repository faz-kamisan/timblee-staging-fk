var Progress = function(options) {
  this.dropContainer = options.dropContainer;
  this.draggableSitemaps = options.draggableSitemaps;
};

Progress.prototype.init = function() {
  var _this = this;
  this.draggableSitemaps.draggable({
    containment: "html",
    revert: function(droppedContainer) {
      return(!(droppedContainer && (droppedContainer[0] != $(this).closest('.drop_container')[0])))
    },
    revertDuration: 200,
    start: function(event, ui) {
      ui.helper.parent('.drag-wrapper').addClass('dragging');
    },
    stop: function(event, ui) {
      ui.helper.parent('.drag-wrapper').removeClass('dragging');
    }
  });
  this.dropContainer.droppable({
    accept: ".draggable_sitemap",
    drop: function(event, ui) {
      var $dropped = $(ui.draggable);
      var $droppedOn = $(this);
      var originalState = $dropped.closest('.drop_container').data('state')
      var targetState = $droppedOn.data('state')
      if($dropped.closest('.drop_container')[0] == $droppedOn[0]) {
        // Take Sitemap back to original container
      } else {
        // Update Sitemap State


        var sourceContainer = $dropped.closest('.drop_container')
        var updatedAt = new Date,
            day = ("0" + updatedAt.getDate()).slice(-2),
            month = updatedAt.toLocaleString('en-us', { month: "short" }),
            year = updatedAt.getFullYear(),
            updatedAtFormatted = month + ' ' + day + ', ' + year;
        $dropped.css({top: 0, left: 0, transform: 'rotate(0deg)'}).parent('.drag-wrapper').removeClass('dragging').detach().prependTo($droppedOn.find('.sitemap_container'));
        $dropped.find('.last-updated').data('original-last-updated', $dropped.find('.last-updated').html());
        $dropped.find('.last-updated').html('Last updated ' + updatedAtFormatted);
        _this.setSitemapCount($droppedOn, sourceContainer);
        _this.checkContainerIsEmpty($droppedOn);
        _this.checkContainerIsEmpty(sourceContainer);



        $.ajax({
          method: 'put',
          url: '/sitemaps/' + $dropped.data('id'),
          data: { sitemap: { state: $droppedOn.data('state') } },
          dataType: 'script',
          error: function() {
            $dropped.parent('.drag-wrapper').detach().prependTo(sourceContainer.find('.sitemap_container'));
            $dropped.find('.last-updated').html($dropped.find('.last-updated').data('original-last-updated'));
            _this.setSitemapCount(sourceContainer, $droppedOn);
            _this.checkContainerIsEmpty($droppedOn);
            _this.checkContainerIsEmpty(sourceContainer);
          }
        });
      }
    },
    over: function(event, elem) {
      $(this).addClass("dragging-over");
    },
    out: function(event, elem) {
      $(this).removeClass("dragging-over");
    }
  });
};

Progress.prototype.checkContainerIsEmpty = function(container) {
  if(container.find('.drag-wrapper').length > 0) {
    container.find('.empty-sitemap-holder').addClass('hidden')
  } else {
    container.find('.empty-sitemap-holder').removeClass('hidden')
  }
}

Progress.prototype.setSitemapCount = function(targetContainer, sourceContainer) {
  this.calculateAndSetSitemapCount(targetContainer, 'add');
  this.calculateAndSetSitemapCount(sourceContainer, 'subtract');
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
  var options = {
    dropContainer : $('.drop_container'),
    draggableSitemaps : $('.draggable_sitemap')
  }
  var progress = new Progress(options);
  progress.init();
});

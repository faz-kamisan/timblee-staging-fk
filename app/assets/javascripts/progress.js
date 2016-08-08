var Progress = function(options) {
  this.dropContainer = options.dropContainer;
  this.draggableSiteMaps = options.draggableSiteMaps;
};

Progress.prototype.init = function() {
  var _this = this;
  this.draggableSiteMaps.draggable({
    cursor: "crosshair",
    start: function (event, ui) {
      $(this).css('transform', 'rotate(-3deg)');
    }
  });
  this.dropContainer.droppable({
    accept: ".draggable_site_map",
    drop: function(event, ui) {
      var $dropped = $(ui.draggable);
      var $droppedOn = $(this);
      $dropped.css('transform', 'rotate(0deg)');
      if($dropped.closest('.drop_container')[0] == $droppedOn[0]) {
        // Take SiteMap back to original container
        $dropped.css({top: 0, left: 0});
      } else {
        // Update Sitemap State
        $.ajax({
          method: 'put',
          url: '/site_maps/' + $dropped.data('id'),
          data: { site_map: { state: $droppedOn.data('state') } },
          dataType: 'script',
          error: function() {
            $dropped.css({top: 0, left: 0});
          },
          success: function() {
            _this.setSiteMapCount($droppedOn, $dropped.closest('.drop_container'))
            $dropped.css({top: 0, left: 0}).parent('.drag-wrapper').detach().prependTo($droppedOn);
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

Progress.prototype.setSiteMapCount = function(targetContainer, sourceContainer) {
  this.calculateAndSetSiteMapCount(targetContainer, 'add');
  this.calculateAndSetSiteMapCount(sourceContainer, 'subtract');
}

Progress.prototype.calculateAndSetSiteMapCount = function(container, method) {
  var siteMapCountContainer = container.parent('.drag-me').find('.site-map-count')
  var count = siteMapCountContainer.data('count');
  if(method == 'add') {
    var newCount = ++count
  } else if(method == 'subtract') {
    var newCount = --count
  } else {
    return
  }
  siteMapCountContainer.data('count', newCount);
  siteMapCountContainer.html(newCount + ' Sitemaps');
}


$(function() {
  var options = {
    dropContainer : $('.drop_container'),
    draggableSiteMaps : $('.draggable_site_map')
  }
  var progress = new Progress(options);
  progress.init();
});

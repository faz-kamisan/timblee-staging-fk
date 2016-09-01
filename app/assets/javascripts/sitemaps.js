var Sitemaps = function(options) {
  this.actionOverlays = options.actionOverlays;
  this.newSiteampLink = options.newSiteampLink;
  this.dropContainers = options.dropContainers;
  this.draggableSitemaps = options.draggableSitemaps;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;
  this.newSiteampLink.on('click', function(event) {
    $(this).parent('form#new_sitemap').submit();
  })
  $('body').on('click', function(event) {
    var $tartget = $(event.target)
    if($tartget.closest('.sitemap_wrapper').length > 0) {
      var sitemapId = $tartget.closest('.sitemap_wrapper').find('.sitemap-container').data('id')
      _this.actionOverlays.not('[data-id= ' + sitemapId.toString() + ']').animate({ top: 230 }, 150);
    } else {
      _this.actionOverlays.animate({ top: 230 }, 150);
    }
  });
};

Sitemaps.prototype.bindDraggers = function() {
  var _this = this;
  this.draggableSitemaps.draggable({
    revert: 'invalid',
    containment: "html",
    start: function(event, ui) {
      _this.actionOverlays.animate({ top: 230 }, 150);
      ui.helper.parent('.sitemap_wrapper').addClass('dragging');
    },
    stop: function(event, ui) {
      ui.helper.parent('.sitemap_wrapper').removeClass('dragging');
    }
  });
}

Sitemaps.prototype.init = function() {
  this.bindEvents();
  this.bindDraggers();
}

$(function() {
  var options = {
    actionOverlays : $('.actions-overlay'),
    dropContainers : $('.folder-info'),
    newSiteampLink : $('.new-sitemap-link'),
    draggableSitemaps : $('.sitemap-container').not('.new-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

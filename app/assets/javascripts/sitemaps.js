var Sitemaps = function(options) {
  this.actionOverlays = options.actionOverlays
  this.newSitemapModal = options.newSitemapModal;
  this.newSitemapLink = options.newSitemapLink;
  this.newSitemap = options.newSitemap;
  this.sitemapErrorModal = options.sitemapErrorModal;
  this.dropContainers = options.dropContainers;
  this.draggableSitemaps = options.draggableSitemaps;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;

  this.newSitemap.on('click', _this.newSitemapLink, function() {
    if($(this).data('allow-more-sitemaps')) {
      _this.configureNewSitemapModal();
      _this.newSitemapModal.modal('show');
    } else {
      _this.sitemapErrorModal.modal('show');
    }
  });

  $('body').on('click', function(event) {
    var $target = $(event.target);
    if($target.closest('.sitemap_wrapper').length > 0) {
      var sitemapId = $target.closest('.sitemap_wrapper').find('.sitemap-container').data('id')
      _this.actionOverlays.not('[data-id= ' + sitemapId.toString() + ']').animate({ top: 230 }, 150);
    }
    else if($target.hasClass('hide-delete-modal')) {
      setTimeout(function() {
        _this.actionOverlays.animate({ top: 230 }, 150);
      }, 250);
    }
    else {
      _this.actionOverlays.animate({ top: 230 }, 150);
    }
  });
};

Sitemaps.prototype.configureNewSitemapModal = function() {
  this.newSitemapModal.find('.sitemap-hidden-folder-id').val($('.folder-info.active-delete').data('id'));
}

Sitemaps.prototype.bindDraggers = function() {
  var _this = this;
  this.draggableSitemaps.draggable({
    revert: 'invalid',
    containment: "html",
    tolerance: 'pointer',
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
    newSitemap : $('.new-sitemap'),
    newSitemapLink : ('.new-sitemap-link'),
    newSitemapModal: $('#create_sitemap_modal'),
    sitemapErrorModal: $('#sitemap-error-modal'),
    dropContainers : $('.folder-info'),
    draggableSitemaps : $('.sitemap-container').not('.new-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

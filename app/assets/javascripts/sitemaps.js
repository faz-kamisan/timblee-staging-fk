var Sitemaps = function(options) {
  this.actionOverlays = options.actionOverlays
  this.newSitemapLink = options.newSitemapLink;
  this.newSitemap = options.newSitemap;
  this.sitemapErrorModal = options.sitemapErrorModal;
  this.inviteErrorModal = options.inviteErrorModal;
  this.inviteErrorLink = options.inviteErrorLink;
  this.deleteSitemapModal = options.deleteSitemapModal;
  this.deleteSitemapLink = options.deleteSitemapLink
  this.dropContainers = options.dropContainers;
  this.draggableSitemaps = options.draggableSitemaps;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;

  this.newSitemap.on('click', _this.newSitemapLink, function() {
    if(_this.newSitemapLink.data('allow-more-sitemaps')) {
      $(this).submit();
    } else {
      _this.sitemapErrorModal.modal('show');
    }
  });

  $('body').on('click', '.delete-sitemap-modal-link', function(e) {
    _this.deleteSitemapModal.modal('show')
  })

  $('body').on('click', '.invite-error-link', function(e) {
    _this.inviteErrorModal.modal('show')
  })

  $('.modal').on('hidden.bs.modal', function () {
    setTimeout(function() {
    _this.actionOverlays.animate({ top: 230 }, 150);
    }, 250);
  });

  $('body').on('click', function(event) {
    var $target = $(event.target);
    if($target.closest('.sitemap_wrapper').length > 0) {
      var sitemapId = $target.closest('.sitemap_wrapper').find('.sitemap-container').data('id')
    }
    else {
      _this.actionOverlays.animate({ top: 230 }, 150);
    }
  });
};

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
    newSitemap : $('.new_sitemap'),
    newSitemapLink : $('.new-sitemap-link'),
    sitemapErrorModal: $('#sitemap-error-modal'),
    inviteErrorModal: $('#invite-error-modal'),
    inviteErrorLink: $('.invite-error-link'),
    deleteSitemapModal: $('#delete-sitemap-modal'),
    deleteSitemapLink: $('.delete-sitemap-modal-link'),
    dropContainers : $('.folder-info'),
    draggableSitemaps : $('.sitemap-container').not('.new-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

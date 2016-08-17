var Sitemaps = function(options) {
  this.newSitemapLink = options.newSitemapLink;
  this.newSitemapModal = options.newSitemapModal;
  this.dropContainers = options.dropContainers;
  this.draggableSitemaps = options.draggableSitemaps;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;
  this.newSitemapLink.on('click', function() {
    _this.configureNewSitemapModal();
    _this.newSitemapModal.modal('show');
  })
};

Sitemaps.prototype.configureNewSitemapModal = function() {
  this.newSitemapModal.find('.sitemap-hidden-folder-id').val($('.folder-info.active-delete').data('id'));
}

Sitemaps.prototype.bindDraggers = function() {
  var _this = this;
  this.draggableSitemaps.draggable({
    revert: 'invalid',
    containment: "body",
    start: function(event, ui) {
      $('.actions-overlay').removeClass('animate-top');
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
    newSitemapLink : $('.new-sitemap-link'),
    newSitemapModal: $('#create_sitemap_modal'),
    dropContainers : $('.folder-info'),
    draggableSitemaps : $('.sitemap-container').not('.new-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

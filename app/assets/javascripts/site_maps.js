var SiteMaps = function(options) {
  this.newSiteMapLink = options.newSiteMapLink;
  this.newSiteMapModal = options.newSiteMapModal;
};

SiteMaps.prototype.bindEvents = function() {
  var _this = this;
  this.newSiteMapLink.on('click', function() {
    _this.configureNewSiteMapModal();
    _this.newSiteMapModal.modal('show');
  })
};

SiteMaps.prototype.configureNewSiteMapModal = function() {
  this.newSiteMapModal.find('.sitemap-hidden-folder-id').val($('.folder-info.active-delete').data('id'))
}

$(function() {
  var options = {
    newSiteMapLink : $('.new-site-map-link'),
    newSiteMapModal: $('#create_site_map_modal')
  }
  var siteMaps = new SiteMaps(options);
  siteMaps.bindEvents();
});
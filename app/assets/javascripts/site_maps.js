var SiteMaps = function(options) {
  this.newSiteMapLink = options.newSiteMapLink;
  this.newSiteMapModal = options.newSiteMapModal;
  this.dropContainers = options.dropContainers;
  this.draggableSiteMaps = options.draggableSiteMaps;
};

SiteMaps.prototype.bindEvents = function() {
  var _this = this;
  this.newSiteMapLink.on('click', function() {
    _this.configureNewSiteMapModal();
    _this.newSiteMapModal.modal('show');
  })
};

SiteMaps.prototype.configureNewSiteMapModal = function() {
  this.newSiteMapModal.find('.sitemap-hidden-folder-id').val($('.folder-info.active-delete').data('id'));
}

SiteMaps.prototype.bindDraggers = function() {
  var _this = this;
  this.draggableSiteMaps.draggable({revert: 'invalid'});
  this.dropContainers.droppable({
    accept: ".site-map-container",
    drop: function(event, ui) {
      var $droppedSiteMap = $(ui.draggable);
      var $droppedOnFolder = $(this);
      if($droppedSiteMap.data('folder-id') == $droppedOnFolder.data('id')) {
        // Take SiteMap back to original position
        _this.revertSiteMap($droppedSiteMap, $droppedOnFolder);
      } else {
        // Update Sitemap Folder
        $.ajax({
          method: 'put',
          url: '/site_maps/' + $droppedSiteMap.data('id'),
          data: { site_map: { folder_id: $droppedOnFolder.data('id') } },
          dataType: 'script',
          complete: function() {
            _this.revertSiteMap($droppedSiteMap, $droppedOnFolder);
          },
          success: function() {
            var sourceFolderId = $droppedSiteMap.data('folder-id');
            if(sourceFolderId && sourceFolderId != '') {
              var $sourceFolder = $('.folder-info[data-id=' + $droppedSiteMap.data('folder-id') + ']');
            } else {
              var $sourceFolder = $('.folder-info.all-site-map-folder');
            }
            _this.setSiteMapCountForFolders($droppedOnFolder, $sourceFolder);
            $droppedSiteMap.attr('data-folder-id', $droppedOnFolder.data('id'));
            $droppedSiteMap.data('folder-id', $droppedOnFolder.data('id'));
            $('.folder-info.active-delete').find('.folder-info-block').click();
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
}

SiteMaps.prototype.revertSiteMap = function($droppedSiteMap, $droppedOnFolder) {
  $droppedSiteMap.css({top: 0, left: 0});
  $droppedOnFolder.removeClass("dragging-over");
}

SiteMaps.prototype.setSiteMapCountForFolders = function(targetFolder, sourceFolder) {
  this.calculateAndSetSiteMapCount(targetFolder, 'add');
  this.calculateAndSetSiteMapCount(sourceFolder, 'subtract');
}

SiteMaps.prototype.calculateAndSetSiteMapCount = function(folder, method) {
  if(folder.data('id') == '') {
    return();
  }
  var count = folder.data('site-map-count');
  if(method == 'add') {
    var newCount = ++count;
  } else if(method == 'subtract') {
    var newCount = --count;
  } else {
    return();
  }
  folder.data('site-map-count', newCount);
  folder.attr('data-site-map-count', newCount);
  folder.find('.folder-items').html(newCount);
}


SiteMaps.prototype.init = function() {
  this.bindEvents();
  this.bindDraggers();
}

$(function() {
  var options = {
    newSiteMapLink : $('.new-site-map-link'),
    newSiteMapModal: $('#create_site_map_modal'),
    dropContainers : $('.folder-info'),
    draggableSiteMaps : $('.site-map-container').not('.new-site-map')
  }
  var siteMaps = new SiteMaps(options);
  siteMaps.init();
});

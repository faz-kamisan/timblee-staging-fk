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
    containment: ".user-dashboard",
    start: function(event, ui) {
      $('.actions-overlay').removeClass('animate-top');
      ui.helper.parent('.sitemap_wrapper').addClass('dragging');
    },
    stop: function(event, ui) {
      ui.helper.parent('.sitemap_wrapper').removeClass('dragging');
    }
  });
  this.dropContainers.droppable({
    accept: ".sitemap-container",
    drop: function(event, ui) {
      var $droppedSitemap = $(ui.draggable);
      var $droppedOnFolder = $(this);
      if($droppedSitemap.data('folder-id') == $droppedOnFolder.data('id')) {
        // Take Sitemap back to original position
        _this.revertSitemap($droppedSitemap, $droppedOnFolder);
      } else {
        // Update Sitemap Folder
        $.ajax({
          method: 'put',
          url: '/sitemaps/' + $droppedSitemap.data('id'),
          data: { sitemap: { folder_id: $droppedOnFolder.data('id') } },
          dataType: 'script',
          complete: function() {
            _this.revertSitemap($droppedSitemap, $droppedOnFolder);
          },
          success: function() {
            var sourceFolderId = $droppedSitemap.data('folder-id');
            if(sourceFolderId && sourceFolderId != '') {
              var $sourceFolder = $('.folder-info[data-id=' + $droppedSitemap.data('folder-id') + ']');
            } else {
              var $sourceFolder = $('.folder-info.all-sitemap-folder');
            }
            _this.setSitemapCountForFolders($droppedOnFolder, $sourceFolder);
            $droppedSitemap.attr('data-folder-id', $droppedOnFolder.data('id'));
            $droppedSitemap.data('folder-id', $droppedOnFolder.data('id'));
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

Sitemaps.prototype.revertSitemap = function($droppedSitemap, $droppedOnFolder) {
  $droppedSitemap.css({top: 0, left: 0});
  $droppedOnFolder.removeClass("dragging-over");
}

Sitemaps.prototype.setSitemapCountForFolders = function(targetFolder, sourceFolder) {
  this.calculateAndSetSitemapCount(targetFolder, 'add');
  this.calculateAndSetSitemapCount(sourceFolder, 'subtract');
}

Sitemaps.prototype.calculateAndSetSitemapCount = function(folder, method) {
  if(folder.data('id') == '') {
    return
  }
  var count = folder.data('sitemap-count');
  if(method == 'add') {
    var newCount = ++count;
  } else if(method == 'subtract') {
    var newCount = --count;
  } else {
    return
  }
  folder.data('sitemap-count', newCount);
  folder.attr('data-sitemap-count', newCount);
  folder.find('.folder-items').html(newCount);
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

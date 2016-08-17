var Folders = function(options) {
  this.folderList = options.folderList;
  this.allSitemapsFolder = options.allSitemapsFolder;
  this.classToToggle = options.classToToggle;
  this.deletionModal = options.deletionModal;
};

Folders.prototype.bindEvents = function() {
  var _this = this;
  this.folderList.on('click', '.folder-info-block', function() {
    var $this = $(this);
    _this.filterSitemaps($this.parent('.folder-info').data('id'));
    _this.setActiveFolder($this);
    $('.folder-heading').text($this.data('name'));
  });

  this.folderList.on('dblclick', '.folder-info-block', function() {
    var $this = $(this);
    $this.find('.folder-name-text').addClass('hidden');
    $this.find('.folder-name-field').removeClass('hidden').focus();
  });

  this.folderList.on('blur keyup', '.folder-name-field', function(e) {
    if(e.type == 'focusout' || e.keyCode == '13') {
      var $this = $(this);
      if($this.val() == $this.data('name')) {
        $this.siblings('.folder-name-text').removeClass('hidden');
        $this.addClass('hidden');
      } else {
        $.ajax({
          method: 'put',
          url: '/folders/' + $this.data('id'),
          data: { folder: { name: $this.val() } },
          dataType: 'script',
          success: function(e, data, status, xhr) {
            _this.makeFoldersDroppable($('.folder-info'));
          }
        });
      }
    }
  });

  this.folderList.on('mouseenter', '.folder-info', function() {
    if(!$(this).hasClass('all-sitemap-folder')) {
      $(this).find('.delete-folder').addClass('open');
    }
  });

  this.folderList.on('mouseleave', '.folder-info', function() {
    $(this).find('.delete-folder').removeClass('open');
  });

  this.folderList.on('click', 'a.delete-folder', function(){
    _this.configureDeletionModal($(this));
    $('#delete-folder-modal').modal('show');
  });

  $('#new_folder').on("ajax:success", function(e, data, status, xhr) {
    _this.makeFoldersDroppable($('.folder-info'));
  });

  $('#confirm-delete-folder-btn').on('click', function() {
    _this.sendFolderDeletionRequest();
    _this.resetDeletionModal();
    _this.deletionModal.modal('hide');
  });
  this.makeFoldersDroppable($('.folder-info'));
};

Folders.prototype.makeFoldersDroppable = function(folders) {
  var _this = this;
  folders.droppable({
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

Folders.prototype.setSitemapCountForFolders = function(targetFolder, sourceFolder) {
  this.calculateAndSetSitemapCount(targetFolder, 'add');
  this.calculateAndSetSitemapCount(sourceFolder, 'subtract');
}

Folders.prototype.calculateAndSetSitemapCount = function(folder, method) {
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

Folders.prototype.revertSitemap = function($droppedSitemap, $droppedOnFolder) {
  $droppedSitemap.css({top: 0, left: 0});
  $droppedOnFolder.removeClass("dragging-over");
}

Folders.prototype.sendFolderDeletionRequest = function(id) {
  $.ajax({
      method: 'delete',
      url: '/folders/' + this.deletionModal.data('id'),
      dataType: 'script'
    })
}

Folders.prototype.setActiveFolder = function(obj) {
  $('.folder-info').removeClass('active-delete');
  obj.parent('.folder-info').addClass('active-delete');
}

Folders.prototype.configureDeletionModal = function(obj) {
  var parentWithData = obj.parent('.folder-info');
  this.deletionModal.data('id', parentWithData.data('id'));
  this.deletionModal.find('span.delete-modal-folder-name').html(parentWithData.data('name'));
  this.deletionModal.find('div.folder-name-to-delete .inner-name').html(parentWithData.data('name'));
  this.deletionModal.find('span.delete-modal-folder-sitemap-count').html(parentWithData.data('sitemap-count'));
}

Folders.prototype.resetDeletionModal = function() {
  this.deletionModal.data('id', null);
  this.deletionModal.find('span.delete-modal-folder-name').html();
  this.deletionModal.find('div.folder-name-to-delete .inner-name').html();
  this.deletionModal.find('span.delete-modal-folder-sitemap-count').html();
}

Folders.prototype.filterSitemaps = function(folderId) {
  $('.sitemap-container').closest('.sitemap-outer-wrapper').removeClass('hidden');
  if(folderId) {
    $('.sitemap-container').filter('[data-folder-id!=' + folderId + ']').not('.new-sitemap').closest('.sitemap-outer-wrapper').addClass('hidden');
  }
}

$(function() {
  var options = {
    folderList : $('.folders-list'),
    allSitemapsFolder : $('.all-sitemap-folder'),
    deletionModal: $('#delete-folder-modal'),
    classToToggle : 'open'
  },
  folders = new Folders(options);
  folders.bindEvents();
});

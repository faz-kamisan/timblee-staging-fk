var Folders = function(options) {
  this.folderList = options.folderList;
  this.allSiteMapsFolder = options.allSiteMapsFolder;
  this.classToToggle = options.classToToggle;
  this.deletionModal = options.deletionModal;
};

Folders.prototype.bindEvents = function() {
  var _this = this;
  this.folderList.on('click', '.folder-info-block', function() {
    var $this = $(this);
    _this.filterSiteMaps($this.parent('.folder-info').data('id'));
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
          dataType: 'script'
        });
      }
    }
  });

  this.folderList.on('mouseenter', '.folder-info', function() {
    if(!$(this).hasClass('all-site-map-folder')) {
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

  $('#confirm-delete-folder-btn').on('click', function() {
    _this.sendFolderDeletionRequest();
    _this.resetDeletionModal();
    _this.deletionModal.modal('hide');
  });
};

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
  this.deletionModal.find('div.folder-name-to-delete').html(parentWithData.data('name'));
  this.deletionModal.find('span.delete-modal-folder-sitemap-count').html(parentWithData.data('site-map-count'));
}

Folders.prototype.resetDeletionModal = function() {
  this.deletionModal.data('id', null);
  this.deletionModal.find('span.delete-modal-folder-name').html();
  this.deletionModal.find('div.folder-name-to-delete').html();
  this.deletionModal.find('span.delete-modal-folder-sitemap-count').html();
}

Folders.prototype.filterSiteMaps = function(folderId) {
  $('.site-map-container').removeClass('hidden');
  if(folderId) {
    $('.site-map-container').filter('[data-folder-id!=' + folderId + ']').not('.new-site-map').addClass('hidden');
  }
}

$(function() {
  var options = {
    folderList : $('.folders-list'),
    allSiteMapsFolder : $('.all-site-map-folder'),
    deletionModal: $('#delete-folder-modal'),
    classToToggle : 'open'
  },
  folders = new Folders(options);
  folders.bindEvents();
});
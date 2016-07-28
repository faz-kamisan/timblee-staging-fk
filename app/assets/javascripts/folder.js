var Folders = function(options) {
  this.folderList = options.folderList;
  this.allSiteMapsFolder = options.allSiteMapsFolder;
  this.classToToggle = options.classToToggle;
};

Folders.prototype.bindEvents = function() {
  var _this = this;
  this.folderList.on('click', '.folder-info', function() {
    var $this = $(this);
    _this.filterSiteMaps($this.data('id'));
    _this.setActiveFolder($this)
  });
  this.folderList.on('mouseenter', '.folder-info', function() {
    if(!$(this).hasClass('all-site-map-folder')) {
      $(this).find('.delete-folder').addClass('open');
    }
  });
  this.folderList.on('mouseleave', '.folder-info', function() {
    $(this).find('.delete-folder').removeClass('open');
  });
};

Folders.prototype.setActiveFolder = function(obj) {
  $('.folder-info').removeClass('active-delete');
  obj.addClass('active-delete');
  if(!obj.hasClass('all-site-map-folder')) {
    // obj.find('.delete-folder').addClass('open');
  }
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
    classToToggle : 'open'
  },
  folders = new Folders(options);
  folders.bindEvents();
});
var DeleteFolder = function(options) {
  this.folder = options.folder;
  this.allSiteMapsFolder = options.allSiteMapsFolder;
  this.deleteFolderBtn = options.deleteFolderBtn;
  this.classToToggle = options.classToToggle;
};

DeleteFolder.prototype.showDelete = function() {
  var _this = this;
  this.folder.not(_this.allSiteMapsFolder).on('click', function() {
    var $this = $(this);
    $('.delete-folder').removeClass('open');
    $('.folder-info').removeClass('active-delete');
    $this.addClass('active-delete');
    $this.find(_this.deleteFolderBtn).addClass('open');
  });
};

$(function() {
  var options = {
    folder : $('.folder-info'),
    allSiteMapsFolder : $('.all-site-map-folder'),
    deleteFolderBtn : $('.delete-folder'),
    classToToggle : 'open'
  },
  deleteFolder = new DeleteFolder(options);
  deleteFolder.showDelete();
});
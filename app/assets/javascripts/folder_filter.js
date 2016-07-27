function FolderFilter($siteMapsDiv){
  this.$siteMapsDiv = $siteMapsDiv;
}

FolderFilter.prototype.filterSiteMaps = function(folderId) {
  $('.site-map-container').removeClass('hidden');
  if(folderId) {
    $('.site-map-container').filter('[data-folder-id!=' + folderId + ']').addClass('hidden');
  }
}

FolderFilter.prototype.bindEvents = function(){
  var _this = this;
  this.$siteMapsDiv.on('click', '.folder-name', function(e) {
    _this.filterSiteMaps($(this).closest('div').data('id'));
  })
};

$(document).ready(function() {
  var folderFilter = new FolderFilter($('.folders-listing'));
  folderFilter.bindEvents();
});

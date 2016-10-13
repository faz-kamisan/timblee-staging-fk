var Sitemaps = function(options) {
  this.actionOverlays = options.actionOverlays
  this.newSitemapLink = options.newSitemapLink;
  this.newSitemap = options.newSitemap;
  this.sitemapErrorModal = options.sitemapErrorModal;
  this.sitemapWarningModal = options.sitemapWarningModal;
  this.inviteErrorModal = options.inviteErrorModal;
  this.inviteWarningModal = options.inviteWarningModal;
  this.inviteErrorLink = options.inviteErrorLink;
  this.inviteWarningLink = options.inviteWarningLink;
  this.deleteSitemapModal = options.deleteSitemapModal;
  this.sitemapShareModal = options.sitemapShareModal;
  this.shareMethodTabs = options.shareMethodTabs;
  this.deleteSitemapLink = options.deleteSitemapLink;
  this.copyButtonLink = options.copyButtonLink;
  this.dropContainers = options.dropContainers;
  this.draggableSitemaps = options.draggableSitemaps;
  this.searchSitemapInput = options.searchSitemapInput;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;

  this.newSitemap.on('click', _this.newSitemapLink, function() {
    if($(this).find(_this.newSitemapLink).data('allow-more-sitemaps') == 'yes') {
      $(this).submit();
    } else if($(this).find(_this.newSitemapLink).data('allow-more-sitemaps') == 'warn') {
      _this.sitemapWarningModal.modal('show');
    } else {
      _this.sitemapErrorModal.modal('show');
    }
  });

  this.searchSitemapInput.on('input', function(e) {
    $('.sitemap-container').closest('.sitemap-outer-wrapper').removeClass('hide');
    if(e.target.value.trim().length > 0) {
      $(e.target).closest('.dashboard-search').addClass('active');
      var searchQueryRegExp = new RegExp(('\\b' + e.target.value.trim()), 'gi')
      $('.sitemap-container').not('.new-sitemap').not(function(i, element) { return $(element).data('name').match(searchQueryRegExp) }).closest('.sitemap-outer-wrapper').addClass('hide');
    } else {
      $(e.target).closest('.dashboard-search').removeClass('active');
    }
  });

  $('body').on('click', '.delete-sitemap-modal-link', function(e) {
    _this.deleteSitemapModal.modal('show')
  })

  $('body').on('click', '.sitemap-share-modal-link', function(e) {
    _this.configureSitemapShareModal($(this));
    _this.sitemapShareModal.modal('show')
  })

  $('body').on('click', '.copy-link-button', function(e) {
    _this.copyUrl();
    $(this).html('Copied');
  })

  this.shareMethodTabs.on('click', 'li', function(e) {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    var targetMethod = $(this).data('target')
    $('.' + targetMethod).siblings('.sitemap-share-method').addClass('hide');
    $('.' + targetMethod).removeClass('hide')
  })

  $('body').on('click', '.invite-error-link', function(e) {
    _this.inviteErrorModal.modal('show')
  })

  $('body').on('click', '.invite-warning-link', function(e) {
    _this.inviteWarningModal.modal('show')
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

  $('.share-emails-input').tagit({
    afterTagAdded: function(event, ui) {
      _this.afterTagAdded(event, ui);
    }
  })
};

Sitemaps.prototype.afterTagAdded = function(event, ui) {
  var tagValue = $(ui.tag.find('span')[0]).html();
  if (!this.isEmail(tagValue)){
    $('.share-emails-input').tagit("removeTagByLabel", tagValue);
  }
};

Sitemaps.prototype.isEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

Sitemaps.prototype.copyUrl = function() {
  var myelement = document.getElementById('sitemap-public-share-url'),
        range = document.createRange();
  range.selectNode(myelement);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};

Sitemaps.prototype.configureSitemapShareModal = function(obj) {
  if(obj.data('url')) {
    this.sitemapShareModal.find('#sitemap-public-share-url span').html(obj.data('url'))
    this.sitemapShareModal.data('sitemap-id', obj.data('sitemap-id'));
    if(obj.data('shared-users').length > 0) {
      var sharedUserEmails = obj.data('shared-users').split(',');
      this.addSharedUsersToModal(sharedUserEmails)
    }
  }
  $('.share-emails-input').tagit('removeAll');
  this.sitemapShareModal.find('.share-method-tabs li:first').click()
  this.sitemapShareModal.find('.share-method-tabs .url').click()
  this.sitemapShareModal.find('.copy-link-button').html('Copy');
  this.sitemapShareModal.find('a.demo-share').attr('href', obj.data('url'))
};

Sitemaps.prototype.addSharedUsersToModal = function(sharedUserEmails) {
  var sharedUsersDiv = this.sitemapShareModal.find('.already-emailed')
  sharedUsersDiv.html('');
  sharedUsersDiv.append('<p>These people have already been emailed</p>');
  var userList = $('<ul>')
  sharedUserEmails.forEach(function(user_email, index) {
    var classForListItem = (index > 1 ? 'extra-shared-users hide' : '')
    var userListItem = $('<li>', { class: classForListItem })
    userListItem.append(user_email)
    userListItem.append($('<span>', { class: 'icon-save-circle' }))
    userList.append(userListItem)
  })
  sharedUsersDiv.append(userList)

  var extraUserCount = sharedUserEmails.length - 2
  if(extraUserCount == 1) {
    var showOthersLink = $('<a>', { id:'show-others', href: 'javascript:void(0)', html: '1 other' })
    sharedUsersDiv.append(showOthersLink)
  }
  if(extraUserCount > 1) {
    var showOthersLink = $('<a>', { id:'show-others', href: 'javascript:void(0)', html: (extraUserCount.toString() + ' others') })
    sharedUsersDiv.append(showOthersLink)
  }
}

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
    sitemapWarningModal: $('#sitemap-warning-modal'),
    inviteErrorModal: $('#invite-error-modal'),
    inviteWarningModal: $('#invite-warning-modal'),
    inviteErrorLink: $('.invite-error-link'),
    inviteWarningLink: $('.invite-warning-link'),
    deleteSitemapModal: $('#delete-sitemap-modal'),
    deleteSitemapLink: $('.delete-sitemap-modal-link'),
    sitemapShareModal: $('#sitemap-share-modal'),
    dropContainers : $('.folder-info'),
    copyButtonLink: $('.copy-link-button'),
    shareMethodTabs: $('.share-method-tabs'),
    draggableSitemaps: $('.sitemap-container').not('.new-sitemap'),
    searchSitemapInput: $('.search-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

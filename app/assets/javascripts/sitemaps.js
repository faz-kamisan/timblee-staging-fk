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
  this.shareEmailsInputTags = options.shareEmailsInputTags;
};

Sitemaps.prototype.bindEvents = function() {
  var _this = this;

  this.sitemapShareModal.find('form.generate_pdf_link').off('submit').on('submit', function (e) {
    e.preventDefault();
    $(this).find('button.share-sitemap-button').html('GENERATING PDF...')
    $(this).find('button.share-sitemap-button').attr('disabled', true)
    $.ajax({
      method: 'post',
      url: this.action,
      data: { include_comments: $(this).find('input.include_comments').prop('checked'), page_size:  $(this).find('input.page_size').val()}
    }).always(function () {
      $('.modal').modal('hide');
      $('.sitemap-share-modal').find('form.generate_pdf_link button.share-sitemap-button').html('CREATE PDF')
      $('.sitemap-share-modal').find('form.generate_pdf_link button.share-sitemap-button').attr('disabled', false)
    }).done(function () {
      $.when( window.location = this.url.replace('generate_pdf', 'download_pdf') + '?' + this.data ).then(function( data, textStatus, jqXHR ) {
        $('.flash-message').html('<div class=flash><div class=message success>PDF successfully downloaded</div></div>');
      });
    }).fail(function () {
      $('.flash-message').html('<div class=flash><div class=message alert>Something went wrong.</div></div>');
    })
  });
  this.sitemapShareModal.find('form.generate_png_link').off('submit').on('submit', function (e) {
    e.preventDefault();
    $(this).find('button.share-sitemap-button').html('GENERATING PNG...')
    $(this).find('button.share-sitemap-button').attr('disabled', true)
    $.ajax({
      method: 'get',
      url: this.action
    }).always(function () {
      $('.modal').modal('hide');
      $('.sitemap-share-modal').find('form.generate_png_link button.share-sitemap-button').html('CREATE PNG')
      $('.sitemap-share-modal').find('form.generate_png_link button.share-sitemap-button').attr('disabled', false)
    }).done(function () {
      $.when( window.location = this.url.replace('generate_png', 'download_png') ).then(function( data, textStatus, jqXHR ) {
        $('.flash-message').html('<div class=flash><div class=message success>PNG successfully downloaded</div></div>');
      });
    }).fail(function () {
      $('.flash-message').html('<div class=flash><div class=message alert>Something went wrong.</div></div>');
    })
  });

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
      $('.sitemap-container').not('.new-sitemap').not(function(i, element) { return($(element).data('name').toString().match(searchQueryRegExp)) }).closest('.sitemap-outer-wrapper').addClass('hide');
    } else {
      $(e.target).closest('.dashboard-search').removeClass('active');
    }
  });

  // this.sitemapShareModal.on('shown.bs.modal', function(e) {
  //   $(this).find('.share-method-tabs li:first').click()
  // })

  $('body').on('click', '.delete-sitemap-modal-link', function(e) {
    _this.deleteSitemapModal.modal('show')
  })

  $('body').on('click', '.sitemap-share-modal-link', function(e) {
    _this.configureSitemapShareModal($(this));
    _this.sitemapShareModal.modal('show')
  })

  $('.export-list li').on('click',function (e) {
    $('form.pdf-export input.page_size').val($(this).data('page-size'))
  })

  $('body').on('click', '.copy-link-button', function(e) {
    _this.copyUrl();
    $(this).addClass('copied').html('SHARE LINK COPIED');
  });

  if(!$('.sitemap-share-modal').hasClass('in')) {
    $('.copy-link-button').removeClass('copied')
  }

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

  this.shareEmailsInputTags.tagit({
    placeholderText: 'Enter their emails seperated by commas.',
    afterTagAdded: function(event, ui) {
      _this.afterTagAdded(event, ui);
    },
    afterTagRemoved: function (event, ui) {
      _this.afterTagRemoved(event, ui)
    }
  })
};

Sitemaps.prototype.afterTagAdded = function(event, ui) {
  var tagValue = $(ui.tag.find('span')[0]).html();
  if (!this.isEmail(tagValue)){
    this.shareEmailsInputTags.tagit("removeTagByLabel", tagValue);
  }
  this.shareEmailsInputTags.data("ui-tagit").tagInput.attr('placeholder', '')
};


Sitemaps.prototype.afterTagRemoved = function(event, ui) {
  if(this.shareEmailsInputTags.tagit('assignedTags').length == 0) {
    this.shareEmailsInputTags.data("ui-tagit").tagInput.attr('placeholder', 'Enter their emails seperated by commas.')
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
  var _this = this;
  if(obj.data('url')) {
    this.sitemapShareModal.find('#sitemap-public-share-url').html(obj.data('url'))
    this.sitemapShareModal.data('sitemap-id', obj.data('sitemap-id'));
    this.sitemapShareModal.find('.warning-message').data('level-one-pages', obj.attr("data-level-one-pages"));
    if(obj.attr("data-level-one-pages") > 15){
      this.sitemapShareModal.find('.warning-message span.warning-size').html('A2');
      this.sitemapShareModal.find('.warning-message span.warning-pages').html(15);
      this.sitemapShareModal.find('.warning-message').removeClass('hide');
    } else if(obj.attr("data-level-one-pages") > 10){
      this.sitemapShareModal.find('.warning-message').removeClass('hide');
    } else{
      this.sitemapShareModal.find('.warning-message').addClass('hide');
    }

    this.sitemapShareModal.find('form.generate_pdf_link').attr('action', obj.data('pdf-url'));
    this.sitemapShareModal.find('form.generate_png_link').attr('action', obj.data('png-url'));
    var sharedUserEmails = obj.data('shared-users').split(',');
    this.addSharedUsersToModal(sharedUserEmails)
  }
  $('.share-emails-input').tagit('removeAll');
  $('.share-comment-input').find('.emoji-wysiwyg-editor').html('');
  this.sitemapShareModal.find('.share-method-tabs li:first').click()
  this.sitemapShareModal.find('.share-method-tabs .url').click()
  this.sitemapShareModal.find('.copy-link-button').html('Copy the share link');
  this.sitemapShareModal.find('a.demo-share').attr('href', obj.data('url'))
};

Sitemaps.prototype.addSharedUsersToModal = function(sharedUserEmails) {
  var sharedUsersDiv = this.sitemapShareModal.find('.already-emailed')
  this.sitemapShareModal.find('.share-personal-message').val('')
  sharedUsersDiv.html('');
  sharedUsersDiv.append('<p>These people have already been emailed:</p>');
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
    searchSitemapInput: $('.search-sitemap'),
    shareEmailsInputTags: $('.share-emails-input')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

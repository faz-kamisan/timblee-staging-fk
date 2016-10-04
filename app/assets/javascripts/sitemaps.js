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
  this.customMessage = options.customMessage;
  this.addMessageLink = options.addMessageLink;
  this.clearMessageLink = options.clearMessageLink
  this.shareSitemapButton = options.shareSitemapButton
  this.draggableSitemaps = options.draggableSitemaps;
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

  this.addMessageLink.on('click', function() {
    if(_this.customMessage.val().trim().length > 0) {
      _this.customMessage.data('send', true);
      $(this).addClass('hidden');
      _this.clearMessageLink.removeClass('hidden');
    }
  })

  this.clearMessageLink.on('click', function() {
    _this.customMessage.data('send', false);
    _this.customMessage.val('');
    $(this).addClass('hidden');
    _this.addMessageLink.removeClass('hidden');
  })

  this.shareSitemapButton.on('click', function() {
    var tags = $('.share-emails-input').val().split(',').join(' ')
    if(_this.customMessage.data('send')) {
      var customMessage = _this.customMessage.val();
    }
    $.ajax({
      url: '/sitemaps/' + _this.sitemapShareModal.data('sitemap-id') + '/share_via_email',
      method: 'post',
      dataType: 'JSON',
      data: { emails: tags, custom_message: (customMessage || '') },
      success: function() {
        document.location.href = '/home/dashboard';
      },
      error: function() {
        document.setFlash(result.responseText)
      }
    });
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
  this.sitemapShareModal.find('#sitemap-public-share-url span').html(obj.data('url'))
  this.sitemapShareModal.data('sitemap-id', obj.data('sitemap-id'));
  $('.share-emails-input').tagit('removeAll');
  this.sitemapShareModal.find('.share-method-tabs li:first').click()
  this.sitemapShareModal.find('.share-method-tabs .url').click()
  this.sitemapShareModal.find('.copy-link-button').html('Copy');
  this.sitemapShareModal.find('a.demo-share').attr('href', obj.data('url'))
};

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
    customMessage: $('.custom-message'),
    addMessageLink: $('.add-custom-message'),
    clearMessageLink: $('.cancel-custom-message'),
    shareSitemapButton: $('.share-sitemap-button'),
    draggableSitemaps : $('.sitemap-container').not('.new-sitemap')
  }
  var sitemaps = new Sitemaps(options);
  sitemaps.init();
});

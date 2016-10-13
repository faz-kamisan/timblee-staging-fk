var SettingsTabs = function(options) {
  this.url = document.location.toString();
  this.navTabUl = options.navTabUl;
  this.tabs = options.tabs;
};

SettingsTabs.prototype.bindEvents = function() {
  $(this.navTabUl + ' a').on('click', function() {
    $('.settings > .tab-content > .tab-pane').removeClass('active')
    $('#' + $(this).data('name')).addClass('active')

    window.history.pushState("", "", '/users/settings/' + $(this).data('name'));
  })
};

$($(window).on('load', function() {
  var options = {
    navTabUl : 'ul.nav-tabs',
    tabs : [ '#team', '#my-info', '#personalization', '#billing' ]
  }
  new SettingsTabs(options).bindEvents();

  $('.animated-tab.active').click();
}));

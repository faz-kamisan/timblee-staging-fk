var SettingsTabs = function(options) {
  this.url = document.location.toString();
  this.navTabUl = options.navTabUl;
  this.tabs = options.tabs;
};

SettingsTabs.prototype.bindEvents = function() {
  if (this.url.match('#')) {
    $(this.navTabUl + ' a[href= "#' + this.url.split('#')[1] + '"]').tab('show');
  }

  //Change hash for page-reload
  for (var i = 0; i < this.tabs.length; i++) {
    $(this.navTabUl + ' a[href= "' + this.tabs[i] + '"]').on('click', function (e) {
        window.location.hash = e.target.hash;
    });
  };

  $('.animated-tab.active').click();

};

$($(window).on('load', function() {
  var options = {
    navTabUl : 'ul.nav-tabs',
    tabs : [ '#team', '#my-info', '#personalization', '#billing' ]
  }
  new SettingsTabs(options).bindEvents();
}));

var SettingsTabs = function(options) {
  this.url = document.location.toString();
  this.nav_tab_ul = options.nav_tab_ul;
  this.tabs = options.tabs;
};

SettingsTabs.prototype.bindEvents = function() {
  if (this.url.match('#')) {
    $(this.nav_tab_ul + ' a[href= "#' + this.url.split('#')[1] + '"]').tab('show');
  }

  //Change hash for page-reload
  for (var i = 0; i < this.tabs.length; i++) {
    $(this.nav_tab_ul + ' a[href= "' + this.tabs[i] + '"]').on('click', function (e) {
        window.location.hash = e.target.hash;
    });
  };

};

$(function() {
  var options = {
    nav_tab_ul : 'ul.nav-tabs',
    tabs : [ '#team', '#my-info', '#personalization', '#billing' ]
  }
  new SettingsTabs(options).bindEvents();
});

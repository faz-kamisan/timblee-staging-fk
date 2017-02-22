var ToggleClass = function(options) {
  this.targetElement = options.targetElement;
  this.classToToggle = options.classToToggle;
};

ToggleClass.prototype.toggle = function() {
  var _this = this;
  this.targetElement.on('click', function() {
    _this.targetElement.removeClass(_this.classToToggle);
    $(this).addClass(_this.classToToggle);
  });
};

ToggleClass.prototype.toggleSiblings = function() {
  var _this = this;
  this.targetElement.on('click', function() {
    $(this).siblings('li').removeClass(_this.classToToggle);
    $(this).addClass(_this.classToToggle);
  });
};

$(function() {
  var options = {
    targetElement: $('.select-card li'),
    classToToggle: 'active'
  };

  var exportOptions = {
    targetElement: $('.export-list li'),
    classToToggle: 'active'
  };

  toggleClass = new ToggleClass(options);
  toggleClass.toggle();

  toggleExportClass = new ToggleClass(exportOptions);
  toggleExportClass.toggleSiblings();
});

var ClearText = function(options) {
  this.targetElement = options.targetElement;
  this.clearBtn = options.clearBtn;
};

ClearText.prototype.clear = function() {
  var _this = this,
       BLANK = "";
  this.clearBtn.on('click', function() {
    $(this).closest(_this.targetElement.val(BLANK));
  });
};

$(function() {
  var options = {
    targetElement : $('.clear-field'),
    clearBtn : $('.clear-text')
  },
  clearText = new ClearText(options);
  clearText.clear();
});

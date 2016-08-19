var Plan = function(options) {
  this.plansCostSpan = options.plansCostSpan;
  this.inputUserLink = options.inputUserLink;

};

Plan.prototype.bindEvents = function() {
  var _this = this;
  this.inputUserLink.on('input', function() {
    if(this.value < 1) {
      this.value = 1;
    }
    var monthlyCharge = '$' + (CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (parseInt(this.value)- 1)))
    _this.plansCostSpan.html(monthlyCharge);
  })
};


$(function() {
  var options = {
    plansCostSpan : $('#monthly-charge'),
    inputUserLink : $('input.plan-users-input')
  }
  new Plan(options).bindEvents();
});

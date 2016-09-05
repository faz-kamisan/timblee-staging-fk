$(function() {
  $("#myTags").tagit({
    afterTagAdded: function(event, ui) {
      tagValue = ui.tag.find('input').val();
      if (!isEmail(tagValue)){
        $("#myTags").tagit("removeTagByLabel", tagValue);
      } else {
        $.ajax({
          url: $("#myTags").data('url'),
          dataType: 'json',
          data: { 'email': tagValue },
          success: function (data) {
            if(data.existing_email){
              ui.tag.addClass("invalid-tag");
            }else {
              ui.tag.addClass("valid-tag");
              var count = parseInt($('.users-count').html()) + 1,
                monthlyCharge = '$' + (CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (count - 1)));
              $('.users-count').html(count);
              $('.total-amount').html(monthlyCharge);
            }
          }
        });
      }
    },
    afterTagRemoved: function (event, ui) {
      if(ui.tag.hasClass('valid-tag')) {
        var count = parseInt($('.users-count').html()) - 1,
          monthlyCharge = '$' + (CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (count - 1)));
        $('.users-count').html(count);
        $('.total-amount').html(monthlyCharge);
      }
    }
  });
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

});

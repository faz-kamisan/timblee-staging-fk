$(function() {
  window.intercomSettings = {
    email: $('.get-in-touch').data('user-email') || $('#user_email').val(),
    app_id: INTERCOM_APP_ID,
    custom_launcher_selector: '.get-in-touch'};

  if($('.business-info').data('business-id')){
    window.intercomSettings['company']= {
      id: $('.business-info').data('business-id')
    }
    window.intercomSettings['user_id'] = $('.business-info').data('user-id')
  }
});

$($(window).on('load', function() {
  $('.get-in-touch').attr('href', 'mailto:' + INTERCOM_APP_ID + '@incoming.intercom.io')
  window.intercomSettings = {
    email: $('#user_email').val() || $('.get-in-touch').data('user-email'),
    created_at: Date.now(),
    app_id: INTERCOM_APP_ID,
    custom_launcher_selector: '.get-in-touch'
  };
}));



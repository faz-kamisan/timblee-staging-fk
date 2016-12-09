$(function() {
  window.intercomSettings = {
    email: $('.get-in-touch').data('user-email') || $('#user_email').val(),
    app_id: INTERCOM_APP_ID,
    custom_launcher_selector: '.get-in-touch'};
});

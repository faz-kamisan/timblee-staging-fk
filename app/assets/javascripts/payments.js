$(function($) {
  $('#add-card-form').on('submit', function(event) {
    var $form = $(this);

    $form.find('button#add-card').prop('disabled', true);
    var expiration = $('input.cc-exp').payment('cardExpiryVal');

    Stripe.card.createToken(
      {
        number: $('.cc-number', this).val(),
        cvc: $('.cc-cvv', this).val(),
        exp_month: (expiration.month || 0),
        exp_year: (expiration.year || 0)
      }
      , stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});

function stripeResponseHandler(status, response) {
  var $form = $('#add-card-form');

  if (response.error) {

    $form.find('.cc-errors').text(response.error.message);
    $form.find('button#add-card').prop('disabled', false);

  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
};

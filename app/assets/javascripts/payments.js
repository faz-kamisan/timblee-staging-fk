var Payment = function(form, usersCount) {
  this.form = form;
  this.usersCount = usersCount;
};

Payment.prototype.createToken = function() {
  var _this = this;
  this.form.on('submit', function(event) {
    var $form = $(this);
    $form.find('button#add-card').prop('disabled', true);
    $form.find('a#cancel').addClass('disabled');
    var expiration = $form.find('input.cc-exp').payment('cardExpiryVal');

    Stripe.card.createToken(
      {
        number: $form.find('.cc-number', this).val(),
        cvc: $form.find('.cc-cvv', this).val(),
        exp_month: (expiration.month || 0),
        exp_year: (expiration.year || 0)
      }
      , _this.stripeResponseHandler.bind(_this));

    // Prevent the form from submitting with the default action
    return false;
  });
};


Payment.prototype.stripeResponseHandler = function (status, response) {
  var $form = this.form;

  if (response.error) {

    $form.find('.cc-errors').text(response.error.message);
    $form.find('button#add-card').prop('disabled', false);
    $form.find('a#cancel').removeClass('disabled');

  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    if(this.usersCount) {
      $form.append($('<input type="hidden" name="no_of_users" />').val(this.usersCount.val()));
      $form.append($('<input type="hidden" name="stripe_plan_id" />').val(PRO_STRIPE_ID));
    }
    // and submit
    $form.get(0).submit();
  }
};

$(function($) {
  var form1       = $('#add-card-form'),
      form2       = $('#add-card-modal-form'),
      usersCount  = $('.plan-users-input');


  new Payment(form1, null).createToken();
  new Payment(form2, usersCount).createToken();
});

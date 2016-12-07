var Payment = function(form, loading_image) {
  this.form = form;
  this.ccNumberDiv = this.form.find('.cc-number').closest('div');
  this.expDiv = this.form.find('.cc-exp').closest('div');
  this.cvvDiv = this.form.find('.cc-cvv').closest('div');
  this.errorsDiv = this.form.find('.cc-errors');
  this.loading_image = loading_image;
};

Payment.prototype.createToken = function() {
  var _this = this;
  this.form.on('submit', function(event) {
    if(_this.loading_image) {
      _this.loading_image.show();
    }
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
    // Show the errors on the form
      this.ccNumberDiv.removeClass('field_with_errors');
      this.expDiv.removeClass('field_with_errors');
      this.cvvDiv.removeClass('field_with_errors');

    if (response.error.param == 'number'){
      this.errorsDiv.text("You seem to have entered a wrong card number. Please check and fix this.");
      this.ccNumberDiv.addClass('field_with_errors');
    }
    else if (response.error.param == 'exp_year' || response.error.param == 'exp_month'){
      this.errorsDiv.text("The expiry date you've entered seems like it's wrong. Please check and fix this.");
      this.expDiv.addClass('field_with_errors');
    }
    else if (response.error.param == 'cvc'){
      this.errorsDiv.text("Your CVV seems to be invalid. Visa and MasterCard cards have a three digit CVV on the back, and AMEX has a four digit one on the front. Please re-enter this.");
      this.cvvDiv.addClass('field_with_errors');
    }
    else {
      this.ccNumberDiv.addClass('field_with_errors');
      this.cvvDiv.addClass('field_with_errors');
      this.expDiv.addClass('field_with_errors');
      this.errorsDiv.text(response.error.message);
    }

    $form.find('button#add-card').prop('disabled', false);
    $form.find('a#cancel').removeClass('disabled');

  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit

    $form.trigger('submit.rails');
  }
  this.loading_image.hide();
};

$(function($) {
  var form1         = $('#add-card-form'),
      loading_image = $('.loading-image')
      form2         = $('#add-card-modal-form');


  new Payment(form1, null).createToken();
  new Payment(form2, loading_image).createToken();
});

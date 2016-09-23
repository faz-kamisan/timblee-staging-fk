CREATE_CHARGE_RESPONSE = {
  'id': 'ch_18EHjhF0niFpGrDavMaBlS7l',
  'object': "charge",
  'amount': 10000,
  'amount_refunded': 0,
  'application_fee': nil,
  'balance_transaction': "txn_18EHjiF0niFpGrDaK2L09rAO",
  'captured': true,
  'created': 1464004841,
  'currency': "usd",
  'customer': 'xyz',
  'description': nil,
  'destination': nil,
  'dispute': nil,
  'failure_code': nil,
  'failure_message': nil,
  'frusd_details': {},
  'invoice': nil,
  'livemode': false,
  'metadata': {},
  'order': nil,
  'paid': true,
  'receipt_email': nil,
  'receipt_number': nil,
  'refunded': false,
  'refunds': {
    'object': "list",
    'data': [],
    'has_more': false,
    'total_count': 0,
    'url': "/v1/charges/ch_18EHjhF0niFpGrDavMaBlS7l/refunds"
  },
  'shipping': nil,
  'source': {
    'id': 'card_18EHjUF0niFpGrDawepvpKLt',
    'object': "card",
    'address_city': nil,
    'address_country': nil,
    'address_line1': nil,
    'address_line1_check': nil,
    'address_line2': nil,
    'address_state': nil,
    'address_zip': nil,
    'address_zip_check': nil,
    'brand': "Visa",
    'country': "US",
    'customer': 'xyz',
    'cvc_check': "pass",
    'dynamic_last4': nil,
    'exp_month': 1,
    'exp_year': 2020,
    'fingerprint': "ZceYQxAriLIh1XG1",
    'funding': "credit",
    'last4': "4242",
    'metadata': {},
    'name': nil,
    'tokenization_method': nil
  },
  'source_transfer': nil,
  'statement_descriptor': nil,
  'status': "succeeded"
}

CREATE_FAILED_CHARGE_RESPONSE = {
  'id': 'ch_18EHjhF0niFpGrDavMaBlS7l',
  'status': "failed",
  'failure_message': 'Your account does not have enough funds to carry out the transaction.'
}

FETCH_CUSTOMER_RESPONSE = {
  "account_balance": 0,
  "created": 1330717999,
  "default_source": "card_1234",
  "description": "user5",
  "email": "user5@example.com",
  "id": "xyz",
  "livemode": false,
  "object": "customer",
  "active_card": {
    "country": "US",
    "cvc_check": "pass",
    "exp_month": 1,
    "exp_year": 2015,
    "last4": "4242",
    "object": "card",
    "type": "Visa"
  },
  "discount": {
    "end": 1333401541,
    "id": "di_HJZlbeDqk9TQOk",
    "object": "discount",
    "start": 1330723141,
    "coupon": {
      "duration": "once",
      "id": "coupon-1",
      "livemode": false,
      "max_redemptions": 20,
      "object": "coupon",
      "percent_off": 10,
      "redeem_by": 1333238399,
      "times_redeemed": 2
    }
  },
  "next_recurring_charge": {
    "amount": 14016,
    "date": "2012-04-02"
  },
  "subscriptions": {
    "object": "list",
    "data": [
      {
        "id": "sub_1234",
        "object": "subscription",
        "application_fee_percent": nil,
        "cancel_at_period_end": false,
        "canceled_at": nil,
        "created": 1473939404,
        "current_period_end": 1474026170,
        "current_period_start": 1473939770,
        "customer": "xyz",
        "discount": nil,
        "ended_at": nil,
        "livemode": false,
        "metadata": {
        },
        "plan": {
          "id": "pro",
          "object": "plan",
          "amount": 100,
          "created": 1473769046,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {
          },
          "name": "pro",
          "statement_descriptor": nil,
          "trial_period_days": nil
        },
        "quantity": 67,
        "start": 1474005008,
        "status": "active",
        "tax_percent": nil,
        "trial_end": nil,
        "trial_start": nil
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/customers/xyz/subscriptions"

  },
  "sources": {
    "object":"list",
    "data":[
      {
        "id":"card_1234",
        "object":"card",
        "address_city":nil,
        "address_country":nil,
        "address_line1":nil,
        "address_line1_check":nil,
        "address_line2":nil,
        "address_state":nil,
        "address_zip":nil,
        "address_zip_check":nil,
        "brand":"Visa",
        "country":"US",
        "customer":"xyz",
        "cvc_check":"pass",
        "dynamic_last4":nil,
        "exp_month":12,
        "exp_year":2017,
        "fingerprint":"lmVAj7AKHEd7BMJD",
        "funding":"credit",
        "last4":"4242",
        "metadata":{},
        "name":nil,
        "tokenization_method":nil
      }
    ],
    "has_more":false,
    "total_count":2,
    "url":"/v1/customers/xyz/sources"
  }
}

FETCH_CUSTOMER_RESPONSE_WITHOUT_SUBSCRIPTION = {
  "account_balance": 0,
  "created": 1330717999,
  "default_source": "card_1234",
  "description": "user5",
  "email": "user5@example.com",
  "id": "xyz",
  "livemode": false,
  "object": "customer",
  "active_card": {
    "country": "US",
    "cvc_check": "pass",
    "exp_month": 1,
    "exp_year": 2015,
    "last4": "4242",
    "object": "card",
    "type": "Visa"
  },
  "discount": {
    "end": 1333401541,
    "id": "di_HJZlbeDqk9TQOk",
    "object": "discount",
    "start": 1330723141,
    "coupon": {
      "duration": "once",
      "id": "coupon-1",
      "livemode": false,
      "max_redemptions": 20,
      "object": "coupon",
      "percent_off": 10,
      "redeem_by": 1333238399,
      "times_redeemed": 2
    }
  },
  "next_recurring_charge": {
    "amount": 14016,
    "date": "2012-04-02"
  },
  "subscriptions": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/customers/xyz/subscriptions"

  },
  "sources": {
    "object":"list",
    "data":[
      {
        "id":"card_1234",
        "object":"card",
        "address_city":nil,
        "address_country":nil,
        "address_line1":nil,
        "address_line1_check":nil,
        "address_line2":nil,
        "address_state":nil,
        "address_zip":nil,
        "address_zip_check":nil,
        "brand":"Visa",
        "country":"US",
        "customer":"xyz",
        "cvc_check":"pass",
        "dynamic_last4":nil,
        "exp_month":12,
        "exp_year":2017,
        "fingerprint":"lmVAj7AKHEd7BMJD",
        "funding":"credit",
        "last4":"4242",
        "metadata":{},
        "name":nil,
        "tokenization_method":nil
      }
    ],
    "has_more":false,
    "total_count":2,
    "url":"/v1/customers/xyz/sources"
  }
}

CREATE_CUSTOMER_RESPONSE = {
  "id": "xyz",
  "object": "customer",
  "account_balance": 0,
  "business_vat_id": nil,
  "created": 1465888241,
  "currency": "usd",
  "default_source": "card_1234",
  "delinquent": false,
  "description": "John Doe",
  "discount": nil,
  "email": nil,
  "livemode": false,
  "metadata": {
  },
  "shipping": nil,
  "sources": {
    "object": "list",
    "data": [
      {
        "id": "card_1234",
        "object": "card",
        "address_city": nil,
        "address_country": nil,
        "address_line1": nil,
        "address_line1_check": nil,
        "address_line2": nil,
        "address_state": nil,
        "address_zip": nil,
        "address_zip_check": nil,
        "brand": "Visa",
        "country": "US",
        "customer": "xyz",
        "cvc_check": "pass",
        "dynamic_last4": nil,
        "exp_month": 5,
        "exp_year": 2020,
        "funding": "unknown",
        "last4": "1111",
        "metadata": {
        },
        "name": nil,
        "tokenization_method": nil
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/customers/xyz/sources"
  },
  "subscriptions": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/customers/xyz/subscriptions"
  }
}

CREATE_CARD_RESPONSE = {
  "id": "card_1234",
  "object": "card",
  "address_city": nil,
  "address_country": nil,
  "address_line1": nil,
  "address_line1_check": nil,
  "address_line2": nil,
  "address_state": nil,
  "address_zip": nil,
  "address_zip_check": nil,
  "brand": "Visa",
  "country": "US",
  "customer": "xyz",
  "cvc_check": "pass",
  "dynamic_last4": nil,
  "exp_month": 12,
  "exp_year": 2017,
  "funding": "credit",
  "last4": "4242",
  "metadata": {
  },
  "name": "as@sasd.com",
  "tokenization_method": nil
}

FETCH_CARD_RESPONSE = {
  "id": "card_1234",
  "object": "card",
  "address_city": nil,
  "address_country": nil,
  "address_line1": nil,
  "address_line1_check": nil,
  "address_line2": nil,
  "address_state": nil,
  "address_zip": nil,
  "address_zip_check": nil,
  "brand": "Visa",
  "country": "US",
  "customer": "xyz",
  "cvc_check": "pass",
  "dynamic_last4": nil,
  "exp_month": 12,
  "exp_year": 2017,
  "funding": "credit",
  "last4": "4242",
  "metadata": {},
  "name": nil,
  "tokenization_method": nil
}

FETCH_INVOICE_RESPONSE ={
  "id": "in_1234",
  "object": "invoice",
  "amount_due": 1900,
  "application_fee": nil,
  "attempt_count": 0,
  "attempted": false,
  "charge": nil,
  "closed": false,
  "currency": "usd",
  "customer": "xyz",
  "date": 1473946998,
  "description": nil,
  "discount": nil,
  "ending_balance": nil,
  "forgiven": false,
  "lines": {
    "data": [
      {
        "id": "sub_1234",
        "object": "line_item",
        "amount": 6700,
        "currency": "usd",
        "description": nil,
        "discountable": true,
        "livemode": true,
        "metadata": {
        },
        "period": {
          "start": 1474026170,
          "end": 1474112570
        },
        "plan": {
          "id": "pro",
          "object": "plan",
          "amount": 100,
          "created": 1473769046,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {
          },
          "name": "pro",
          "statement_descriptor": nil,
          "trial_period_days": nil
        },
        "proration": false,
        "quantity": 1,
        "subscription": nil,
        "type": "subscription"
      }
    ],
    "total_count": 1,
    "object": "list",
    "url": "/v1/invoices/in_1234/lines"
  },
  "livemode": false,
  "metadata": {
  },
  "next_payment_attempt": 1473950598,
  "paid": false,
  "period_end": 1473946922,
  "period_start": 1473860522,
  "receipt_number": nil,
  "starting_balance": 0,
  "statement_descriptor": nil,
  "subscription": "sub_9BeTHDnvIBerS8",
  "subtotal": 1900,
  "tax": nil,
  "tax_percent": nil,
  "total": 1900,
  "webhooks_delivered_at": nil
}
FETCH_INVOICE_RESPONSE_WITH_NEGATIVE_BALANCE = {
  "id": "in_1234",
  "object": "invoice",
  "amount_due": -1900,
  "application_fee": nil,
  "attempt_count": 0,
  "attempted": false,
  "charge": nil,
  "closed": false,
  "currency": "usd",
  "customer": "xyz",
  "date": 1473946998,
  "description": nil,
  "discount": nil,
  "ending_balance": nil,
  "forgiven": false,
  "lines": {
    "data": [
      {
        "id": "sub_1234",
        "object": "line_item",
        "amount": 6700,
        "currency": "usd",
        "description": nil,
        "discountable": true,
        "livemode": true,
        "metadata": {
        },
        "period": {
          "start": 1474026170,
          "end": 1474112570
        },
        "plan": {
          "id": "pro",
          "object": "plan",
          "amount": 100,
          "created": 1473769046,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {
          },
          "name": "pro",
          "statement_descriptor": nil,
          "trial_period_days": nil
        },
        "proration": false,
        "quantity": 1,
        "subscription": nil,
        "type": "subscription"
      }
    ],
    "total_count": 1,
    "object": "list",
    "url": "/v1/invoices/in_1234/lines"
  },
  "livemode": false,
  "metadata": {
  },
  "next_payment_attempt": 1473950598,
  "paid": false,
  "period_end": 1473946922,
  "period_start": 1473860522,
  "receipt_number": nil,
  "starting_balance": 0,
  "statement_descriptor": nil,
  "subscription": "sub_9BeTHDnvIBerS8",
  "subtotal": -1900,
  "tax": nil,
  "tax_percent": nil,
  "total": -1900,
  "webhooks_delivered_at": nil
}

UPDATE_SUBSCRIPTION_RESPONSE = {
  "id": "sub_1234",
  "object": "subscription",
  "application_fee_percent": nil,
  "cancel_at_period_end": false,
  "canceled_at": nil,
  "created": 1473921362,
  "current_period_end": 1474100092,
  "current_period_start": 1474013692,
  "customer": "xyz",
  "discount": nil,
  "ended_at": nil,
  "livemode": false,
  "metadata": {
  },
  "plan": {
    "id": "pro",
    "object": "plan",
    "amount": 100,
    "created": 1473769046,
    "currency": "usd",
    "interval": "day",
    "interval_count": 1,
    "livemode": false,
    "metadata": {
    },
    "name": "pro",
    "statement_descriptor": nil,
    "trial_period_days": nil
  },
  "quantity": 67,
  "start": 1474013692,
  "status": "active",
  "tax_percent": nil,
  "trial_end": nil,
  "trial_start": nil
}

CREATE_SUBSCRIPTION_RESPONSE = UPDATE_SUBSCRIPTION_RESPONSE

DELETE_SUBSCRIPTION_RESPONSE = {
  "id": "sub_9CI3WqaMByLrP7",
  "object": "subscription",
  "application_fee_percent": nil,
  "cancel_at_period_end": false,
  "canceled_at": nil,
  "created": 1473921362,
  "current_period_end": 1474100092,
  "current_period_start": 1474013692,
  "customer": "xyz",
  "discount": nil,
  "ended_at": nil,
  "livemode": false,
  "metadata": {
  },
  "plan": {
    "id": "test-pro",
    "object": "plan",
    "amount": 100,
    "created": 1473769046,
    "currency": "usd",
    "interval": "day",
    "interval_count": 1,
    "livemode": false,
    "metadata": {
    },
    "name": "pro",
    "statement_descriptor": nil,
    "trial_period_days": nil
  },
  "quantity": 67,
  "start": 1474013692,
  "status": "canceled",
  "tax_percent": nil,
  "trial_end": nil,
  "trial_start": nil
}

REFUND_CHARGE_RESPONSE = {
  "id": "re_1234",
  "object": "refund",
  "amount": 1900,
  "balance_transaction": "txn_18vPfvKtN57RSwJ2X54hy1EK",
  "charge": "ch_1234",
  "created": 1474283462,
  "currency": "usd",
  "metadata": {
  },
  "reason": nil,
  "receipt_number": nil,
  "status": "succeeded"
}

FETCH_CHARGES_RESPONSE = {
  "object": "list",
  "url": "/v1/charges",
  "has_more": false,
  "data": [
    {
      "id": "ch_1234",
      "object": "charge",
      "amount": 3100,
      "amount_refunded": 0,
      "application_fee": nil,
      "balance_transaction": "txn_1234",
      "captured": true,
      "created": 1474327684,
      "currency": "aud",
      "customer": "xyz",
      "description": nil,
      "destination": nil,
      "dispute": nil,
      "failure_code": nil,
      "failure_message": nil,
      "fraud_details": {
      },
      "invoice": "in_1234",
      "livemode": false,
      "metadata": {
      },
      "order": nil,
      "paid": true,
      "receipt_email": "roohbir@orangebicycle.co",
      "receipt_number": nil,
      "refunded": false,
      "refunds": {
        "object": "list",
        "data": [

        ],
        "has_more": false,
        "total_count": 0,
        "url": "/v1/charges/ch_1234/refunds"
      },
      "shipping": nil,
      "source": {
        "id": "card_1234",
        "object": "card",
        "address_city": nil,
        "address_country": nil,
        "address_line1": nil,
        "address_line1_check": nil,
        "address_line2": nil,
        "address_state": nil,
        "address_zip": nil,
        "address_zip_check": nil,
        "brand": "Visa",
        "country": "US",
        "customer": "xyz",
        "cvc_check": "pass",
        "dynamic_last4": nil,
        "exp_month": 4,
        "exp_year": 2019,
        "funding": "credit",
        "last4": "4242",
        "metadata": {
        },
        "name": nil,
        "tokenization_method": nil
      },
      "source_transfer": nil,
      "statement_descriptor": nil,
      "status": "succeeded"
    }
  ]
}

namespace :sync_to_stripe do
  task trial_businesses: :environment do
    Business.where(is_pro: false).update_all(free_sitemaps_count: 3)
    Business.where(is_pro: false, has_plan:false).each do |business|
      if business.in_trial_period?
        business.assign_attributes(is_pro: true, has_plan: true)
        business.subscriptions.build(no_of_users: business.users.count, quantity: Business.monthly_charge(business.users.count), user: business.owner)
        StripePaymentService.new(business).create_customer_with_initial_subscription
      else
        business.update(has_plan: true)
      end
    end
  end
end

namespace :stripe_plan do
  task create: :environment do
    plans = YAML.load_file("#{Rails.root}/db/data/plans.yml");
    plans.each do |plan|
      Stripe::Plan.create(
        amount: plan['cost_in_cents'],
        interval: STRIPE_INTERVAL,
        name: plan['name'],
        currency: STRIPE_CURRENCY,
        id: plan['stripe_plan_id']
      )
    end
  end
end

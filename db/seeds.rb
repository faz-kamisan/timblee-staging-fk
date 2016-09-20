Stripe::Plan.list.data.each do  |plan|
  Plan.first_or_create(stripe_plan_id: plan.id, name: plan.name, cost_in_cents: (plan.amount))
end

page_types = YAML.load_file("#{Rails.root}/db/data/page_types.yml");

page_types.each do |page_type|
  PageType.first_or_create(name: page_type[:name], icon_name: page_type[:icon_name])
end

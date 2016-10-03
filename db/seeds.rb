plans = YAML.load_file("#{Rails.root}/db/data/plans.yml");
plans.each do  |plan|
  Plan.find_or_create_by(stripe_plan_id: plan['stripe_plan_id'], name: plan['name'], cost_in_cents: (plan['cost_in_cents']))
end

page_types = YAML.load_file("#{Rails.root}/db/data/page_types.yml");

page_types.each do |page_type|
  PageType.find_or_create_by(name: page_type['name'], icon_name: page_type['icon_name'])
end

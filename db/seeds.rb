# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Plan.delete_all

Stripe::Plan.list.data.each do  |plan|
  Plan.create(stripe_plan_id: plan.id, name: plan.name, cost_in_cents: (plan.amount))  #// keeping stripe_plan_id same as in stripe api
end

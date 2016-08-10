# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Plan.delete_all

Plan.create(id: 1, name: 'TIMBLEE-Pro')  #// keeping id same as in stripe api
Plan.create(id: 2, name: 'TIMBLEE-Starter')

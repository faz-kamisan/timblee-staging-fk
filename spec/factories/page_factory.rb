FactoryGirl.define do
  factory :page do
    name "test page"
    association :site_map
  end
end

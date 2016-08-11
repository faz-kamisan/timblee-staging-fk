FactoryGirl.define do
  factory :page do
    name "test page"
    association :sitemap
  end
end

FactoryGirl.define do
  factory :business do
    name "test business"
    association :owner, factory: :user
  end
end

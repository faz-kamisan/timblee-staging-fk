FactoryGirl.define do
  factory :business do
    name "test business"
    trial_days 30
    association :owner, factory: :user
  end
end

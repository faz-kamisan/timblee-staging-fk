FactoryGirl.define do
  factory :user do
    full_name "test user"
    password 'password'
    sequence(:email) { |n| "test_user#{n}@example.com" }
  end
end

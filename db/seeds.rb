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

page_types = [
              {name: 'Blog Post', icon_name: 'blog-post-icon'},
              {name: 'Blog', icon_name: 'blog-icon'},
              {name: 'Calendar', icon_name: 'calendar-icon'},
              {name: 'Checkout/Payment', icon_name: 'checkout-payment-icon'},
              {name: 'Confirmation', icon_name: 'confirmation-icon'},
              {name: 'Contact', icon_name: 'contact-icon'},
              {name: 'Dashboard', icon_name: 'dashboard-icon'},
              {name: 'Download', icon_name: 'download-icon'},
              {name: 'Error', icon_name: 'error-icon'},
              {name: 'Event detail', icon_name: 'event-detail-icon'},
              {name: 'Events', icon_name: 'events-icon'},
              {name: 'External link', icon_name: 'external-link-icon'},
              {name: 'FAQs', icon_name: 'faqs-icon'},
              {name: 'Features', icon_name: 'features-icon'},
              {name: 'Form', icon_name: 'form-icon'},
              {name: 'Gallery', icon_name: 'gallery-icon'},
              {name: 'General 1', icon_name: 'general-1-icon'},
              {name: 'General 2', icon_name: 'General-2-icon'},
              {name: 'Landing Page', icon_name: 'landing-page-icon'},
              {name: 'Legal terms', icon_name: 'legal-terms-icon'},
              {name: 'Listing', icon_name: 'listing-icon'},
              {name: 'Loading', icon_name: 'loading-icon'},
              {name: 'Log in/Sign up', icon_name: 'login-icon'},
              {name: 'Modal/Pop-up', icon_name: 'modal-icon'},
              {name: 'Portfolio', icon_name: 'portfolio-icon'},
              {name: 'Pricing', icon_name: 'pricing-icon'},
              {name: 'Product-Clothing', icon_name: 'product-clothing-icon'},
              {name: 'Product-Electronics', icon_name: 'product-electronics-icon'},
              {name: 'Product-General', icon_name: 'product-general-icon'},
              {name: 'Product-Shoes', icon_name: 'product-shoes-icon'},
              {name: 'Reviews', icon_name: 'reviews-icon'},
              {name: 'Settings', icon_name: 'settings-icon'},
              {name: 'Shop Categories', icon_name: 'shop-categories-icon'},
              {name: 'Shop', icon_name: 'shop-icon'},
              {name: 'Shopping Cart', icon_name: 'shopping-cart-icon'},
              {name: 'Support', icon_name: 'support-icon'},
              {name: 'Team member profile', icon_name: 'team-member-profile-icon'},
              {name: 'Team', icon_name: 'team-icon'},
              {name: 'Thank you', icon_name: 'thank-you-icon'},
              {name: 'Upload', icon_name: 'upload-icon'},
              {name: 'Video', icon_name: 'video-icon'}
            ]

page_types.each do |page_type|
  PageType.create(name: page_type[:name], icon_name: page_type[:icon_name])
end
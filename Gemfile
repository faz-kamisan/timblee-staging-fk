source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails', '4.2.6'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'therubyracer', '~> 0.12.2' , platforms: :ruby
gem 'jquery-rails', '~> 4.1.1'
gem 'jquery-ui-rails', '~> 5.0.5'
gem 'devise', '~> 3.5.10'
gem 'devise_invitable', '~> 1.6.0'
gem "devise-async", '~> 0.10.2'
gem 'pg', '~> 0.18.4'
gem 'sidekiq', '~> 4.1.1'
gem 'non-stupid-digest-assets', '~> 1.0.8'
gem 'carrierwave', '~> 0.10.0'
gem 'paranoia', '~> 2.1.5'
gem 'stripper-rails', '~> 0.0.1'
gem 'stripe', '~> 1.49.0'
gem 'react_on_rails', '~> 6.0.5'
gem 'jc-validates_timeliness', '~> 3.1.1'
gem 'acts_as_tree', '~> 2.4.0'
gem 'pdfkit', '~> 0.8.2'
gem 'wkhtmltopdf-binary', '~> 0.12.3'
gem 'acts_as_list', '~> 0.7.4'
gem 'mini_magick', '~> 4.5.1'
gem 'whenever', require: false
gem 'analytics-ruby', require: "segment"
gem 'createsend'
gem 'intercom', "~> 3.5.9"

group :production do
  gem 'skylight'
end


group :development, :test do
  gem 'byebug', '~> 9.0.5'
  gem 'rspec-rails', '~> 3.5'
  gem 'ultrahook'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'letter_opener', '~> 1.4.1'
  gem 'capistrano', '3.4.1',         require: false
  gem 'capistrano-rails', '~> 1.1.6',   require: false
  gem 'capistrano-bundler', '~> 1.1.4', require: false
  gem 'capistrano-passenger', '~> 0.2.0'
  gem 'capistrano-sidekiq', '~> 0.5.4'
  gem 'bullet', '~> 5.2.0'
  # gem 'quiet_assets', '~> 1.1.0'
end


group :test do
  gem 'shoulda-matchers',          '~> 2.8'
  gem 'shoulda-callback-matchers', '~> 1.1'
  gem 'factory_girl_rails',        '~> 4.5.0'
  gem 'faker',                     '~> 1.6.6'
  gem 'fakeweb',                   '~> 1.3'
  gem 'database_cleaner',          '~> 1.5.3'
  gem 'simplecov',                                 require: false
end

unless Rails.env.development?
  IMGKit.configure do |config|
    config.wkhtmltoimage = '/usr/local/bin/wkhtmltoimage'
  end
end

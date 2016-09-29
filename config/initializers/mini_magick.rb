MiniMagick.configure do |config|
  config.cli = :imagemagick
  config.cli_path = '/usr/local/bin'

  config.processor = 'mogrify'
  config.timeout = 5
end

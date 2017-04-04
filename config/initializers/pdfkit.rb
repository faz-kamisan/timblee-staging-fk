if Rails.env.development?
  PDFKit.configure do |config|
    config.default_options = {
      :orientation => 'Landscape',
      :'javascript-delay' => 2000,
      :dpi => 72,
      :'margin-top' => '29mm'
    }
  end
else
  PDFKit.configure do |config|
    config.wkhtmltopdf = '/usr/local/bin/wkhtmltopdf'
    config.default_options = {
      :orientation => 'Landscape',
      :'javascript-delay' => 2000,
      :dpi => 72
    }
  end
end

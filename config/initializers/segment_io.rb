
SEGMENT_IO_KEY = Rails.application.secrets.segment['segment_io_key']
INTERCOM_SECRET_KEY = Rails.application.secrets.segment['intercom_secret_key']
INTERCOM_APP_ID = Rails.application.secrets.intercom['app_id']
INTERCOM_API_KEY = Rails.application.secrets.intercom['api_key']

AnalyticsRuby = Segment::Analytics.new({
  write_key: SEGMENT_IO_KEY
})
IntercomClient = Intercom::Client.new(app_id: INTERCOM_APP_ID, api_key: INTERCOM_API_KEY)

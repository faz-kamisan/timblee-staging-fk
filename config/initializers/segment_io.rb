
SEGMENT_IO_KEY = Rails.application.secrets.segment['segment_io_key']
INTERCOM_SECRET_KEY = Rails.application.secrets.segment['intercom_secret_key']

AnalyticsRuby = Segment::Analytics.new({
  write_key: SEGMENT_IO_KEY
})

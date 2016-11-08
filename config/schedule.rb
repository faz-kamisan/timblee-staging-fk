# Use this file to easily define all of your cron jobs.
#
env :MAILTO, ['pratibha@vinsol.com', 'bharat@vinsol.com']
env :PATH, ENV['PATH']

set :bundle_command, '/usr/local/bin/bundle exec'
set :output, '/var/www/timblee/shared/log/cron.log'

every 10.minutes do
  rake "notifications:send"
end

if @environment == 'production'
  every 6.hours do
    command 'backup perform --trigger timblee_backup'
  end
end

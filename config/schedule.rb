# Use this file to easily define all of your cron jobs.
#

set :output, '/var/www/apps/timblee/shared/log/cron.log'

every 10.minutes do
  rake "notifications:send"
end

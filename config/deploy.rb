# config valid only for current version of Capistrano
lock '3.4.1'

set :application, 'timblee'
set :repo_url, 'git@github.com:TimbleeApp/web-app.git'
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/timblee'

set :user, 'deploy'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_dirs, fetch(:linked_dirs, []).push('tmp/pids', 'tmp/sockets', 'log', 'public/assets', 'public/system')
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', 'config/sidekiq.yml')

set :ssh_options, {
  user: 'deploy',
  keys: %w(~/.ssh/id_rsa),
  forward_agent: false,
  paranoid: true
}

set :passenger_restart_with_touch, true

set :sidekiq_config, "#{current_path}/config/sidekiq.yml"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  # after :publishing, 'deploy:restart'
  # after :finishing, 'deploy:cleanup'
end

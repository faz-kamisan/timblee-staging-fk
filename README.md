# Timblee
Timblee builds site maps with built in page types

## Infrastructure Setup

    $ gem install bundler && bundle

    $ start postgress server

## DB Setup

### Migrate DB

For first time:

    $ rake db:migrate:setup

To reset:

    $ rake db:migrate:reset:seed


### Starting Job-Workers

From web-app Root

* Start redis-server.

* Start sidekiq server.

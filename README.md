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


TIMBLEE CLIENT SIDE REACT README

To start the project:
* Clone the project.
$ cd client/
$ npm i
$ node_modules/.bin/webpack -d

# This will compile a webpack-bundle.js file which will be used on the client side.

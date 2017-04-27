# Timblee
Timblee builds site maps with built in page types

## Setup

* Clone this repository.

* Copy the following files from '/config' directory:
  * database.yml.example => database.yml
  * secrets.yml.example  => secrets.yml

* Install all the necessary dependencies using the bundler.

      $ bundle install

* Create a database for the application using:

      $ bundle exec rake db:create


* Run the migrations to create all the tables and indices:

      $ bundle exec rake db:migrate

* Populate the database with page_types and plans:

      $ bundle exec rake db:seed


### Starting Job-Workers

From web-app Root

* Start redis-server.

* Start sidekiq server.

* Add the following lines in your system hosts file:

  * 127.0.0.1   share.timblee.dev
  * 127.0.0.1   app.timblee.dev



TIMBLEE CLIENT SIDE REACT README

    $ cd client/
    $ npm i
    $ node_modules/.bin/webpack -d

# This will compile a webpack-bundle.js file which will be used on the client side.

* Now start your rails application using:

      $ rails server

* Yay! Your application will now be running at following urls:-

  * http://localhost:3000/              ---- app.timblee.io
  * http://share.timblee.dev:3000/      ---- share.timblee.io
  * http://app.timblee.dev:3000/        ---- start.timblee.io

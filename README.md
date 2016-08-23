# Contacts List  RESTfull API

This sample project will give you simple login with username, password and social platforms

## Pre-requisites

To get started, you'll need to have the following requirements installed

- Git
- Node.js<sup>1</sup>
- npm
- MongoDB 2.6.x / 3.2.x<sup>2</sup>

<sup>1</sup>See https://nodejs.org/

<sup>2</sup>See https://docs.mongodb.com/manual/administration/install-community/ for installation guides

## Getting started
	
	# Ensure `mongod` is running, either as a service or in another shell
	git clone <this repo>
	cp config/config.sample.json config/config.json
	npm install
	npm run seed # Seed the DB with local users
	npm start

## Running tests

`npm test`

## Running coverage report

`npm run coverage-ui`

## Running coverage report

`npm run lint`

## API documentation

See [API.md](API.md) for details.

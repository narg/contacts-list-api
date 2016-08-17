# Users API

This sample project will give you a minimal RESTful API to build your template against. It only implements user listing and reading - feel free to add other actions (e.g. update, delete, create) as you see fit. It is built using JavaScript/Node.js (our language of choice), ExpressJS (a small, lightweight web MVC framework) & Mongoose (a MongoDB object modelling library).

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
	npm install
	npm run-script seed # Seed the DB with Users
	npm start

## Running tests

`npm test`

## API documentation

See [API.md](API.md) for details.

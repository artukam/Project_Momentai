# Project Momentai

## About this app
Momentai is a simple to-do app used to keep track of tasks, events, habits and so on.  This app is built using the following technology stack:

* Front end:
	* HTML/CSS
	* Javascript
	* jQuery
* Back end:
	* Node.js
	* MongoDB

A full list of all technologies, frameworks and plugins used can be see at the end of this readme.

## Setup
To set up your own copy of the app:

1. Fork or clone this repo.
2. Open the folder containing all the files in this repo in your terminal.
3. Install node on your computer by typing in `brew install node` if you are using a mac with homebrew installed. Otherwise follow the instructions on the following page: https://nodejs.org/en/download/package-manager/.
4. Install all dependencies for this app by typing `npm install`.
5. Install mongoDB by following the instructions on this page: https://docs.mongodb.com/manual/installation/.
6. Start a mongoDB server in your terminal (if you're on a mac, the command is `mongod`).
7. Start the app in your terminal (if you're on a mac, the command is `node app.js`).

## List of all technologies, frameworks and plugins used.
### Front end

* HTML/CSS
	* Bootstrap 3
* Javascript
	* jQuery
	* handlebars.js
 
### Back end
* Node.js
	* Express.js
	* bcrypt
	* body-parser
	* connect-flash
	* cookie-session
	* dotenv
	* locus
	* method-override
	* morgan
	* passport
	* passport-local
	* pug
* MongoDB
	* Mongoose

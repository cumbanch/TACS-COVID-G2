[![Build Status](https://travis-ci.org/molinajulian/TACS-COVID-G2.png?branch=master)](https://travis-ci.org/molinajulian/TACS-COVID-G2)

![codecov.io Code Coverage](https://img.shields.io/codecov/c/github/molinajulian/TACS-COVID-G2.svg)  

# TACS-COVID-G2
  

The application allows following the progression of the COVID-19 pandemic using different tools. The following API will be used as the data source: https://github.com/Laeyoung/COVID-19-API

  

## Prerequisites

You need to have installed:

* [npm](https://www.npmjs.com/get-npm)

* [docker](https://www.docker.com/products/docker-desktop)

## Backend

### Getting started

After cloning de project you need to go to the `backend` directory and execute `npm install` for installing dependencies.

### Starting the application

The backend consists in two containers, one for the application and the other for de database. You can start the application in three differents modes:

 #### Development
 
You have to run `npm run development` or `npm start`.
The containers will be run in background with the following names:

 - **Application**: covid-19-dev
 - **Database**: covid-19-db-dev

The application will be accesible from [http://localhost:8080/](http://localhost:8080/) and the port **9229** will be available to link a debugger.
In this mode the data connection of the database is:

 - **Host**: localhost
 - **Port**: 35432
 - **Username**: admin
 - **Password**: admin
 - **Database name**: covid-19

 #### Testing
 
You have to run `npm run testing`.
The containers will be run in foreground, run the tests and finally will be stopped.

 #### Production
 
You have to run `npm run production`. 
The containers will be run in background with the following names:

 - **Application**: covid-19
 - **Database**: covid-19-db

The application will be accesible from [http://localhost:443/](http://localhost:443/).
In this mode the data connection of the database is:

 - **Host**: localhost
 - **Port**: 5432
 - **Username**: admin
 - **Password**: admin
 - **Database name**: covid-19

### Documentation

The documentation is written with [Swagger](https://swagger.io/) and can be accessed either in `production` or in `development` modes entering the relative route `/api-docs`.

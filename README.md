# Hospital appointment management system application

This application stack contains a single page application for hospital appointment management system built on MEAN stack - Mongo, Express, Angular and Nodejs.

Simple **CRUD operations** are done.

Here's the link for the presentation and demonstration: [https://youtu.be/lcmzlV7wViw](https://youtu.be/lcmzlV7wViw)


## Build and run the application locally.
Pre-requisites:

  Mongo
  
  Node
  
  Angular

**Step 1:**

Open ```/back-end/db/connection.js,``` 

Change the line from ```const uri = 'mongodb://mongo:27017/rest_api_container';``` to ```const uri = 'mongodb://localhost:27017/rest_api_container';```

**Step 2:** 

Execute commands:

```cd back-end``` 

```npm install```

```npm start```


**Step 3:** 

Execute commands:

```cd front-end``` 

```npm install```

```npm start```

Browse the application on [http://localhost:4200](http://localhost:4200)




## Run application stack on Docker-environment

Pre-requisites: 

Docker and docker-compose (version 19.03)

Docker command to start the project:

```docker-compose up -d```

Make sure all the three container - ```rest_api_container, mongo_container``` and ```front_app_container``` are up and running.



## Run Application on individuals containers using docker hub images:

### Backend and frontend is available on Docker hub:

**Pull backend image using command:**


```docker pull vishalpokarne/backendnodeapp```


**Pull frontend image using command:**


```docker pull vishalpokarne/frontendangularapp```

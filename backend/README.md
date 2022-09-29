# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
```

### Compiles and hot-reloads for development
```
npm start
```



# API Documentation
Example
GET - /organizationdata/id/:id
This endpoint is used as an example template for all endpoints in this project

### Organizations
#### GET - /organizationdata/
Returns a list of every organization.

#### GET - /organizationdata/id/:id
Returns a single organization with the specified id

#### GET - /organizationdata/search/
Returns all organizations that match the query parameters. Possible query parameters are organizationName, organizationDate, or organizationEmail. Search mode is determined by the query parameter searchBy which can be given a value of either “name”, “email”, or “phone”.
Example: /organizationdata/search/?searchBy=name&organizationName=Org1

#### POST - /organizationdata/
Adding a new organization 


#### PUT - /organizationdata/:id
Updating organization data

#### DELETE - /organizationdata/:id
Deleting organization data by id


### Clients
GET - /primarydata/
Returns a list of every client.
GET - /primarydata/id/:id
Returns a single client with the specified id.
GET - /primarydata/org/:id
Returns all clients that are part of the provided organization id.
GET - /primarydata/search/
	Returns all clients that match the query parameters. Possible query parameters are firstName, lastName, or phoneNumbers.primaryPhone. Search mode is determined by the query parameter searchBy which can be given a value of either “name” or “number”.

POST /primarydata/

PUT /primarydata/:id
DELETE /primarydata/



### Events
GET - /eventdata/
Returns a list of every event.
GET - /eventdata/id/:id
Returns a single event with the specified id
GET - /eventdata/org/:id
Returns all events that are part of the provided organization id.


GET - /eventdata/search/
Query Parameters: searchBy(name, date) , eventName, eventDate
Returns all events that match the query parameters. Searching can be achieved by passing in a searchBy parameter to determine query type and another parameter for the value. 

POST - /eventdata/

PUT - /eventdata/
PUT - /eventdata/addAttendee/:id
DELETE - /eventdata/

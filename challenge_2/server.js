const http = require('http');
const express = require('express');
var app = express();
var router = express.Router();

//initialize a global storage.
var objectsReceived = [];

app.set('port', 3000)
//***************** REQUEST HANDLER *****************

//logic for the request handler should go here.
//this should probably call the router
//^ Yes. depending on what the request type is, call that method on the router.
const requestHandler = function(req, res) {


}


//***************  HANDLER FUNCTIONS   ***************

//meant to act as a controller/model.
//on a get, this should pull all the data out of our storage as CSV's.
//here, the input will be JSON data. (JavaScript Object)
//on a post, this should add the received object to our storage.

const convertObjectToCSV = function(object) {

}

//****************** THE ROUTER **********************

//this should tell us what function to invoke depending on what kind of request we get.



//****************** THE SERVER **********************

/*
http.createServer(requestHandler).listen(8000, '127.0.0.1', () => {
	console.log("listening on port 8000");
});
*/

app.listen(app.get('port'), console.log("listening on port 8000"));




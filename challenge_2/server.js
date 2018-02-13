const http = require('http');
const express = require('express');

//initialize a global storage.
var objectsReceived = {};


//***************** REQUEST HANDLER *****************

//logic for the request handler should go here.

const requestHandler = function(req, res) {
	console.log("u sent it")
}


//***************CASE HANDLER FUNCTIONS***************

//meant to act as a controller/model.
//on a get, this should pull all the data out of our storage as CSV's.
//here, the input will be JSON data. (JavaScript Object)
//on a post, this should add the received object to our storage.

//****************** THE SERVER **********************

http.createServer(requestHandler).listen(8000, '127.0.0.1', () => {
	console.log("listening on port 8000");
});




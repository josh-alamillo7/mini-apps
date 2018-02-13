const http = require('http');
const express = require('express');
var app = express();
var router = express.Router();

//initialize a global storage.
var objectsReceived = [];

app.set('port', 8000)
//***************** REQUEST HANDLER *****************

//logic for the request handler should go here.
//this should probably call the router
//^ Yes. depending on what the request type is, call that method on the router.


//***************  HANDLER FUNCTIONS   ***************

//meant to act as a controller/model.
//on a get, this should pull all the data out of our storage as CSV's.
//here, the input will be JSON data. (JavaScript Object)
//on a post, this should add the received object to our storage.



const changetoCSV = function(object) {
	//convert an object to the desired CSV output

  var allKeys = Object.keys(object).slice(0, -1);
  finalString = allKeys.join(',') + '\n'
  
  var getAllKeys = function(currentObject) {
    for (var j = 0; j < allKeys.length; j++) {
      console.log(allKeys[j])
      finalString += currentObject[allKeys[j]]
      if (j < allKeys.length - 1) {
        finalString += ','
      }
      else {
        finalString += '\n'
      }
    }
    if (currentObject.children.length === 0) {
      return
    }
    else {
      for (var i = 0; i < currentObject.children.length; i++) {
        getAllKeys(currentObject.children[i])
      }
    }
  }
  
  getAllKeys(object)
  
  return finalString
}

//****************** THE ROUTER **********************

//this should tell us what function to invoke depending on what kind of request we get.
//probably better practice to have the app use the router and have the router handle the post/get
//request separately.
app.use('/', router)
router.get("/", function(req, res) {

})


router.post("/", function(req, res) {
	req.setEncoding('utf8');
	data = ''
	req.on('data', function(chunk) {
		objectsReceived.push(chunk)}).on('end', function() {
			console.log(objectsReceived)
			res.status(201).end("Message received and stored!")
		})
})


//****************** THE SERVER **********************

//how Express initializes its server
app.listen(app.get('port'), console.log("listening on port 8000"));




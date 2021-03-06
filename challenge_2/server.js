const http = require('http');
const express = require('express');
var app = express();
app.use(express.static('client'));
var router = express.Router();

//initialize a global storage.
var objectsReceived = [];

app.set('port', 8000);

//***************  HANDLER FUNCTIONS   ***************

//meant to act as a controller/model.
//on a get, this should pull all the data out of our storage as CSV's.
//here, the input will be JSON data. (JavaScript Object)
//on a post, this should add the received object to our storage.



const changetoCSV = function(object) {
	//convert an object to the desired CSV output

  var allKeys = Object.keys(object).slice(0, -1);
  finalString = allKeys.join(',') + '\n'
  
  var getAllValues = function(currentObject) {

    for (var j = 0; j < allKeys.length; j++) {
      finalString += currentObject[allKeys[j]]
      if (j < allKeys.length - 1) {
        finalString += ',';
      }
      else {
        finalString += '\n';
      }
    }
    if (currentObject.children.length === 0) {
      return
    } else {
      for (var i = 0; i < currentObject.children.length; i++) {
        getAllValues(currentObject.children[i]);
      }
      }
  }
  getAllValues(object);
  
  return finalString;
};

//****************** THE ROUTER **********************

//this should tell us what function to invoke depending on what kind of request we get.
//probably better practice to have the app use the router and have the router handle the post/get
//request separately.
app.use('/', router)
router.get('/', function(req, res) {
  console.log("u got here now what")
	returnString = ""
	for (var i = 0; i < objectsReceived.length; i++) {
		returnString += changetoCSV(objectsReceived[i].slice(0, -1))
	}
	res.status(200).end(returnString)
})


router.post('/', function(req, res) {
  console.log('posted?')
	req.setEncoding('utf8');
	data = ''
	req.on('data', function(chunk) {
    console.log('chunk', chunk)
		chunk = chunk.split('\n').join(' ');
    console.log('splitchunk', chunk)
    

		objectsReceived.push(JSON.parse(chunk))}).on('end', function() {
      console.log(objectsReceived)
			res.status(201).end("Message received and stored!")
		})
})


//****************** THE SERVER **********************

//how Express initializes its server
app.listen(app.get('port'), console.log("listening on port 8000"));




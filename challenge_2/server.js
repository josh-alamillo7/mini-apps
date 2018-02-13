const http = require('http');
const express = require('express');

//****************** THE SERVER **********************

http.createServer(function (req, res) {
	res.write('Hello world!');
	res.end();
}).listen(8000, '127.0.0.1', () => {
	console.log("listening on port 8000");
});
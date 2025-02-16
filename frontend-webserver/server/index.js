/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// Express routes

const express = require('express');

// new express router
const app = express();

// listen on default port 4000
const port = process.env.PORT || 4000;

// use content in folder "public"
app.use(express.static('public'));


// route for css  http://localhost:4000/css
app.use('/css', express.static(__dirname + '/public/css'));

// route for js(for browser) folder http://localhost:4000/js
app.use('/js', express.static(__dirname + '/public/src'));

// route for images http://localhost:4000/images
app.use('/images', express.static(__dirname + '/public/images'));


// listen on port {'port' = 4000} and log
app.listen(port, function() {
  console.log('Server started at http://localhost:%s', port);
});
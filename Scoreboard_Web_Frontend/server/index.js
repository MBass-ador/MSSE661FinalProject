/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// Express routes

import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

// new express router
const app = express();

// listen on default port 4000
const port = process.env.PORT || 4000;

// Get directory name
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Correct the path to the public directory
const __publicPath = path.join(__dirname, '../public');

console.log('serving static files from __publicPath:', __publicPath);
//console.log('Serving static files from:', path.join(__dirname, 'public'));

// use content in folder "public"
app.use(express.static(__publicPath));


// route for css  http://localhost:4000/css
app.use('/css', express.static(path.join(__publicPath, 'public/css')));

// route for js(for browser) folder http://localhost:4000/js
app.use('/js', express.static(path.join(__publicPath, 'public/src')));

// route for images http://localhost:4000/images
app.use('/images', express.static(path.join(__publicPath, 'public/images')));


// listen on port {'port' = 4000} and log
app.listen(port, function() {
  console.log('Server started at http://localhost:%s', port);
});
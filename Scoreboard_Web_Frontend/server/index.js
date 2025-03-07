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

import fs from 'node:fs';

import https from 'node:https';

// new express router
const app = express();

// listen on default http port 4000
const httpPort = process.env.PORT || 4000;
// listen on https port 4443
const httpsPort = process.env.HTTPS_PORT || 4443;

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Correct the path to the public directory
const __publicPath = path.join(__dirname, '../public');

console.log('serving static files from __publicPath:\n', __publicPath);

// use content in folder "public"
app.use(express.static(__publicPath));


// route for css  http://localhost:4000/public/css
app.use('/css', express.static(path.join(__publicPath, 'css')));

// route for js(for browser) folder http://localhost:4000/js
const jsPath = path.join(__publicPath, 'src');
console.log('Serving JS files from:\n', jsPath);
app.use('/js', express.static(jsPath));

// route for images http://localhost:4000/public/images
app.use('/images', express.static(path.join(__publicPath, 'images')));

// serve index.html as default route
app.get('/', (req, res) => {
  console.log('serving index.html');
  res.sendFile(path.join(__publicPath, 'index.html'));
});

// configure https tunnel
https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/server.key'),
      cert: fs.readFileSync(__dirname + '/server.cert'),
    },
    app
  )
  // listen on https port 4443
  .listen(httpsPort, () => {
    console.log('Server started at http://localhost:%s', httpsPort);
  });



// listen on http port 4000
app.listen(httpPort, function() {
  console.log('Server started at http://localhost:%s', httpPort);
});
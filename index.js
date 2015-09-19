"use strict";

var http = require('http');

// Open stdin stream to read from pipe
var stdin = process.openStdin();

// Pause stdin stream until a Chromecast client request the file
stdin.pause();

function handleRequest(request, res){
  res.setHeader('Content-Type', 'video/mp4; codecs="avc1.640029, mp4a.40.2"');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;

  // Start reading from stdin
  stdin.resume();

  // Send data as into HTTP server response
  stdin.pipe(res);
}

var server = http.createServer(handleRequest);
var port = 8080;

server.listen(port, function(){
    console.log("Server listening on: http://localhost:%s", port);
});

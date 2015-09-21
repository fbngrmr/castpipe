'use strict';

var http = require('http');

/**
  * Serve Stdin through a HTTP server
  * @param opts - Server configuration
  * @param [opts.listenOn=0.0.0.0] - Address to accept connections on
  * @param [opts.port=8080] - Port to listen on
  */
function serveStdIn(opts) {
  opts = opts || {};

  // Fallback to default configuration
  var listenOn = opts.listenOn || '0.0.0.0';
  var port = opts.port || 8080;

  var stdin = process.openStdin();

  // Pause stdin stream until a Chromecast client request the file
  stdin.pause();

  // Respond to every request by setting the headers Chromecast expects
  // and then sending the data that is piped in as response to the request
  // of to the client.
  function handleRequest(request, res){
    // Reference: https://developers.google.com/cast/docs/media#media-type-strings
    res.setHeader('Content-Type', 'video/mp4; codecs="avc1.640029, mp4a.40.2"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;

    // Start reading from stdin
    stdin.resume();

    // Send received data as HTTP server response
    stdin.pipe(res);
  }

  var server = http.createServer(handleRequest);
  server.listen(port, listenOn, function(){
    console.log("Server listening on: http://%s:%s", listenOn, port);
  });
}

module.exports = serveStdIn;


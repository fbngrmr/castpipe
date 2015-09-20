'use strict';

var http = require('http');

/**
  * Serve Stdin through a HTTP server
  * @param opts - Server configuration
  * @param [opts.host=0.0.0.0] - Address to accept connections on
  * @param [opts.port=8080] - Port to listen on
  */
function serveStdIn(opts) {
  opts = opts || {};

  // Fallback to default configuration
  var host = opts.host || '0.0.0.0';
  var port = opts.port || 8080;

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

  server.listen(port, host, function(){
    console.log("Server listening on: http://%s:%s", host, port);
  });
}

module.exports = serveStdIn;


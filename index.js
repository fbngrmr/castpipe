'use strict';

var serveStdIn = require('./lib/serveStdIn.js');
var launchChromecastStreamingApp = require('./lib/sendChromecast.js');
var host = 'localhost';
var port = 1337;

serveStdIn({
  host: host,
  port:  host
});

launchChromecastStreamingApp({
  title: 'Pipecast',
  image: '/tmp/foo.png',
  host: host,
  port: port
});


#!/usr/bin/env node

'use strict';

var serveStdIn = require('./lib/serveStdIn.js');
var launchChromecastStreamingApp = require('./lib/sendChromecast.js');
var argv = require('yargs')
    .usage('Usage: $0 --localIP --port [num]')
    .demand(['localIP'])
    .argv;

var server = argv.localIP;
var port = argv.port || 1338;

launchChromecastStreamingApp({
  title: 'Pipecast',
  server: server,
  port: port
}, function startServer() {
  serveStdIn({
    listenOn: server,
    port: port
  });
});

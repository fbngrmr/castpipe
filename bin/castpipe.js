#!/usr/bin/env node

'use strict';

var serveStdIn = require('../lib/serveStdIn.js');
var launchChromecastStreamingApp = require('../lib/sendChromecast.js');
var argv = require('yargs')
    .usage('Usage: $0 --localIP [--port]')
    .option( "localIP", {demand: true, describe: "IP address of computer", type: "string" } )
    .option( "port", { demand: false, describe: "Port for server to listen on" } )
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

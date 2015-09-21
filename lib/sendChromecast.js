'use strict';

var Client                = require('castv2-client').Client;
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
var mdns                  = require('mdns');

/**
  * Serve Stdin through a HTTP server
  * See: https://github.com/thibauts/node-castv2#usage
  *
  * @param opts - Server configuration
  * @param [opts.host=0.0.0.0] - Address to accept connections on
  * @param [opts.port=8080] - Port to listen on
  * @param [opts.image=...] - Image to show while buffering
  * @param [opts.title=castpipe] - Name of the sender app
  */
function launchChromecastStreamingApp(opts, startServer) {
  opts = opts || {};

  // Fallback to default configuration
  var host = opts.server || '0.0.0.0';
  var port = opts.port || 8080;
  var image = opts.image || 'https://placeholdit.imgix.net/~text?txtsize=107&txt=castpipe&w=1280&h=720';
  var title = opts.title || 'castpipe';

  var browser = mdns.createBrowser(mdns.tcp('googlecast'));

  browser.on('serviceUp', function(service) {
    console.log('Found Chromecast "%s" at %s:%d', service.name, service.addresses[0], service.port);
    onDeviceUp(service.addresses[0]);
    browser.stop();
  });

  browser.start();

  function onDeviceUp(chromecast) {
    var client = new Client();

    client.on('error', function(err) {
      console.log('An error (Chromecast) occurred: %s', err.message);
      client.close();
    });

    client.connect(chromecast, function() {
      console.log('Connected, launching DefaultMediaReceiver ...');

      // Bring up server
      startServer();

      client.launch(DefaultMediaReceiver, function(err, player) {
        var media = {
          // URL to any mp4, webm, mp3 or jpg file with the proper contentType.
          contentId: 'http://' + host + ':' + port + '/movie.mp4',
          contentType: 'video/mp4',
          streamType: 'BUFFERED',

          // Title and cover displayed while buffering
          metadata: {
            type: 0,
            metadataType: 0,
            title: title,
            images: [
              { url: image }
            ]
          }
        };

        console.log('DefaultMediaReceiver launched, loading media %s ...', player.session.displayName, media.contentId);

        player.load(media, { autoplay: true }, function(err, status) {
          if(err) {
            console.log('An error (DefaultMediaReceiver) occurred' + err);
            client.close();
          } else {
            console.log('Media loaded. Starting to play soon...');
          }
        });
      });
    });
  }
}

module.exports = launchChromecastStreamingApp;


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
  * @param [opts.title=Pipecast] - Name of the sender app
  */
function launchChromecastStreamingApp(opts) {
  opts = opts || {};

  // Fallback to default configuration
  var host = opts.host || '0.0.0.0';
  var port = opts.port || 8080;
  var image = opts.image || 'https://placeholdit.imgix.net/~text?txtsize=107&txt=Pipecast&w=1280&h=720';
  var title = opts.title || 'Pipecast';

  var browser = mdns.createBrowser(mdns.tcp('googlecast'));

  browser.on('serviceUp', function(service) {
    console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
    ondeviceup(service.addresses[0]);
    browser.stop();
  });

  browser.start();

  function ondeviceup(host) {

    var client = new Client();

    client.connect(host, function() {
      console.log('connected, launching app ...');

      client.launch(DefaultMediaReceiver, function(err, player) {
        var media = {
          // URL to any mp4, webm, mp3 or jpg file with the proper contentType.
          contentId: 'http://' + host + ':' + port,
          contentType: 'video/mp4',
          streamType: 'BUFFERED', // or LIVE

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

        player.on('status', function(status) {
          console.log('status broadcast playerState=%s', status.playerState);
        });

        console.log('app "%s" launched, loading media %s ...', player.session.displayName, media.contentId);

        player.load(media, { autoplay: true }, function(err, status) {
          console.log('media loaded playerState=%s', status.playerState);
        });
      });
    });

    client.on('error', function(err) {
      console.log('Error: %s', err.message);
      client.close();
    });
  }
}

module.exports = launchChromecastStreamingApp;


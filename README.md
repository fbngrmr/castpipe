#pipecast

Pipe video content to a Chromecast receiver. Alpha.

## Installation
```
git clone git@github.com:fbngrmr/pipecast.git
npm install
```

## Usage
```
cat clip.avi | ffmpeg -i - -strict experimental -f matroska -vcodec h264 -acodec aac -ac 2 pipe:1 -profile:v high -level 4.2 | node index.js --localIP=192.168.1.69
```

### Options
* `--localIP={IP}` Set this to local IP address of your computer
* `--port={PORT}` Set this to the port you want the server to listen on

## License
Licensed under the MIT license.

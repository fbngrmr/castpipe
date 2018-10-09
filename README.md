# castpipe

Pipe video content to a Chromecast receiver. Alpha.

## Installation
```
npm install castpipe
```
or:
```
git clone git@github.com:fbngrmr/castpipe.git
cd castpipe
npm install
```

## Usage
```
Usage: index.js --localIP [--port]

Options:
  --localIP  IP address of computer                          [string] [required]
  --port     Port for server to listen on
```

## Example
```
cat clip.avi | ffmpeg -i - -strict experimental -f matroska -vcodec h264 -acodec aac -ac 2 pipe:1 -profile:v high -level 4.2 | node index.js --localIP=192.168.1.69
```

### Options
* `--localIP={IP}` Set this to local IP address of your computer
* `--port={PORT}` Set this to the port you want the server to listen on

## License
Licensed under the MIT license.

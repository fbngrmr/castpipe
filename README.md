#pipecast

Pipe video content to a Chromecast receiver. Pre-alpha.

## Installation
```
git clone git@github.com:fbngrmr/pipecast.git
npm install
```

## Usage
```
cat clip.avi | ffmpeg -i - -strict experimental -f matroska -vcodec h264 -acodec aac -ac 2 pipe:1 -profile:v high -level 4.2
```

#pipecast

Pipe video content to a Chromecast receiver. Pre-alpha.

## Usage
```
cat clip.avi | ffmpeg -i - -f matroska -vcodec h264 -acodec aac -ac2
pipe:1 -profile:v high -level 4.2 | node index.js
```

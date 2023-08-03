### from: https://www.nginx.com/blog/video-streaming-for-remote-learning-with-nginx/#build-tools

## Installation

````bash
$ sudo apt update
$ sudo apt install build-essential git
````

### Installing Dependencies with a Package Manager
````bash
$ sudo apt install libpcre3-dev libssl-dev zlib1g-dev
````

### Compiling NGINX with the RTMP Module
````bash
$ cd /path/to/build/dir
$ git clone https://github.com/arut/nginx-rtmp-module.git
$ git clone https://github.com/nginx/nginx.git
$ cd nginx
$ ./auto/configure --add-module=../nginx-rtmp-module
$ make
$ sudo make install
````

## Running NGINX with configuration
1. Copy nginx.conf to `/usr/local/nginx/conf`
2. Check the configuration with: `sudo /usr/local/nginx/sbin/nginx -t`
3. Run NGINX as a daemon with: `sudo /usr/local/nginx/sbin/nginx`

## Testing the Playback method

Run the following command as pushing the file
````bash
ffmpeg -re -i coral-and-boris-wedding-2022-09-26-1.mp4 -vcodec copy -loop -1 -c:a aac -b:a 160k -ar 44100 -strict -2 -f flv rtmp:192.168.124.216/live/bbb
````

1. Play with rtmp
    On the VLC open stream on address `rtmp://192.168.124.216/live/bbb`
2. Play with HLS
    On the VLC open stream on address `http://192.168.124.216/hls/bbb.m3u8`
3. Play with DASH
    On the VLC open stream on address `http://192.168.124.216/dash/bbb.mpd`



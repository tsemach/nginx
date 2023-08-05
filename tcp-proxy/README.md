#### From
https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#sources

### Installing NGINX from source
````bash
sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev
````

### Installing pcre2-10.42
````
wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz
tar -zxf pcre2-10.42.tar.gz
cd pcre2-10.42
./configure
make
sudo make install
````

### Installing zlibd
````
wget http://zlib.net/zlib-1.2.13.tar.gz
tar -zxf zlib-1.2.13.tar.gz
cd zlib-1.2.13
./configure
make
sudo make install
````

### Installing OpenSSL
````
wget http://www.openssl.org/source/openssl-1.1.1t.tar.gz
tar -zxf openssl-1.1.1t.tar.gz
cd openssl-1.1.1t
./Configure darwin64-x86_64-cc --prefix=/usr
make
sudo make install
````

#### Download source and unpack
````bash
wget https://nginx.org/download/nginx-1.24.0.tar.gz
tar zxvf nginx-1.24.0.tar.gz
````

### Build 

Go to directory nginx-1.24.0

````bash
./configure \
--sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--http-log-path=/var/log/nginx/access.log \
--error-log-path=/var/log/nginx/error.log \
--with-pcre=../pcre2-10.42 \
--with-zlib=../zlib-1.2.13 \
--with-http_ssl_module \
--with-stream \
--with-stream_ssl_module \
--modules-path=/etc/nginx/modules

make

sudo make install
````



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


FROM nginx:alpine

# Очищаем дефолтные файлы Nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем ассеты и страницы сайта
COPY assets/ /usr/share/nginx/html/assets/
COPY portraits.js /usr/share/nginx/html/
COPY *.html /usr/share/nginx/html/

# concept-3-pop-modern.html делаем главной страницей
COPY concept-3-pop-modern.html /usr/share/nginx/html/index.html

# Настройка кеширования и gzip
RUN cat << 'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кеш статических ресурсов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

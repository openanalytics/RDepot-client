# build stage
FROM registry.openanalytics.eu/proxy/library/node:lts-alpine3.20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build 
# production stage
FROM registry.openanalytics.eu/proxy/library/nginx:stable-alpine as production-stage
ENV RDEPOT_USER rdepot
RUN addgroup -g 2000 $RDEPOT_USER && adduser -D -h /home/$RDEPOT_USER/ -s /bin/bash -u 2000 -G $RDEPOT_USER $RDEPOT_USER
RUN sed -i 's/user  nginx;/#user  nginx;/g' /etc/nginx/nginx.conf
RUN mkdir -p /var/cache/nginx && chown -R $RDEPOT_USER:$RDEPOT_USER /var/cache/nginx && \
    mkdir -p /var/log/nginx  && chown -R $RDEPOT_USER:$RDEPOT_USER /var/log/nginx && \
    mkdir -p /var/lib/nginx  && chown -R $RDEPOT_USER:$RDEPOT_USER /var/lib/nginx && \
    touch /run/nginx.pid && chown -R $RDEPOT_USER:$RDEPOT_USER /run/nginx.pid && \
    mkdir -p /etc/nginx/templates /etc/nginx/ssl/certs && \
    chown -R $RDEPOT_USER:$RDEPOT_USER /etc/nginx && \
    chmod -R 744 /etc/nginx/conf.d
COPY --chown=$RDEPOT_USER:$RDEPOT_USER nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=$RDEPOT_USER:$RDEPOT_USER --from=build-stage /app/dist /usr/share/nginx/html
COPY --chown=$RDEPOT_USER:$RDEPOT_USER entrypoint.sh /usr/share/nginx/
RUN chown -R $RDEPOT_USER:$RDEPOT_USER /usr/share/nginx/
USER $RDEPOT_USER
RUN chmod +x /usr/share/nginx/entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
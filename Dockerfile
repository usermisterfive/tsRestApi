FROM node
COPY . .
RUN rm -rf node_modules && \
    npm install && \
    npm run build
CMD npm run node
EXPOSE 7000/tcp
EXPOSE 7000/udp

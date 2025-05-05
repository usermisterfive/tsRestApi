#FROM node:lts-alpine
#COPY package.json package.json
#RUN --mount=src=package.json,target=/package.json \ 
#    --mount=src=webpack.config.js,target=webpack.config.js \
#    --mount=src=tsconfig.json,target=tsconfig.json \
#    --mount=src=products.json,target=products.json \
#    --mount=src=users.json,target=users.json \
#    --mount=src=.env,target=.env \
#    --mount=src=src,target=src \
#    npm install && \
#    npm run ts-node-dev
#RUN --mount=src=dist/bundle.js,target=bundle.js \
#    --mount=src=products.json,target=products.json \
#    --mount=src=users.json,target=users.json \
#    --mount=src=.env,target=.env \
#    node bundle.js
#
FROM ubuntu
COPY . .
RUN apt update && \
    apt install npm -y && \
    npm install

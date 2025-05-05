FROM node:lts-alpine
RUN --mount=src=package.json,target=package.json \
    npm install

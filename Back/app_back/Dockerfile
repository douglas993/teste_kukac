FROM node:8 as builder
WORKDIR /app
COPY package.json /app
RUN npm install -y
COPY . /app
CMD node index.js
EXPOSE 3000
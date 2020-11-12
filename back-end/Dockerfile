FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install && npm install -g nodemon
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
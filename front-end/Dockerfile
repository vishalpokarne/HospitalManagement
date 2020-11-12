FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g @angular/cli
COPY . .
EXPOSE 4200
#CMD ["npm", "start"]
CMD ng serve --host 0.0.0.0

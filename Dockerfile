FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3002

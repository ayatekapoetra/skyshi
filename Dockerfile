FROM node:18

WORKDIR /skyshi
COPY package.json .
RUN npm install -g nodemon && npm install
RUN  npm i @adonisjs/ignitor
RUN  npm i mysql
COPY . .
EXPOSE 3030
CMD [ "npm", "start" ]

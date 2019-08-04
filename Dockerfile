FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["yarn","start"]
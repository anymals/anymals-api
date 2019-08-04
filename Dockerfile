FROM mhart/alpine-node:latest
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm install yarn -g
RUN apk --no-cache add --virtual builds-deps build-base python
COPY . .
RUN yarn install
RUN ping -c 1 10.0.0.106
EXPOSE 4000
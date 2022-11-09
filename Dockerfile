FROM node:16-alpine3.14

LABEL version="1.0"
LABEL description="RabbitMQ Chat Service"

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN ls
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
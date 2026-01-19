FROM node:20-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG PORT
ARG ENV
ARG MONGO_URI
ARG JWT_SECRET

ENV PORT=$PORT
ENV ENV=$ENV
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

RUN echo "PORT=${PORT}" > .env
RUN echo "ENV=${ENV}" > .env
RUN echo "MONGO_URI=${MONGO_URI}" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

RUN npm run build

EXPOSE $PORT

CMD ["node", "build/server"]

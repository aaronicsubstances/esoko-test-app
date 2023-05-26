FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run reset-db
EXPOSE 4500
CMD npm start
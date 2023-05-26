FROM node:16-slim
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node . .
RUN npm install
RUN npm run reset-db
EXPOSE 3000
CMD npm start
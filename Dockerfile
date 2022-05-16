FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]

CMD ["npm", "start"]
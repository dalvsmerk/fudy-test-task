FROM node:18

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "dist/main"]

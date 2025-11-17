FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN mkdir -p uploads/images uploads/videos uploads/avatars

EXPOSE 5000

CMD ["npm", "start"]

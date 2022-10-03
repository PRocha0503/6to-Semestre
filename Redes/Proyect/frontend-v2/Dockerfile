FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/frontend/app

COPY package*.json /usr/frontend/app/
RUN npm install --production

# Bundle app source
COPY . /usr/frontend/app

RUN npx next build

# Run the app
CMD [ "npm", "start" ]
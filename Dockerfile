FROM node:16-alpine

WORKDIR /app

# Adding binaries to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Installing dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY . ./

# Running app
EXPOSE 3000
CMD ["yarn", "start"]

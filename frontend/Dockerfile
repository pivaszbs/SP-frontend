FROM node

WORKDIR /frontend

RUN apt update; apt install yarn -y

ENV PATH /frontend/node_modules/.bin:$PATH

RUN yarn global add serve

COPY src/package.json .

COPY src/yarn.lock .

RUN yarn install

COPY src/ .

RUN yarn build

CMD ["serve", "-s", "build", "-l", "42421"]

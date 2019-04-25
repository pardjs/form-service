FROM registry.cn-shanghai.aliyuncs.com/pardjs/base:10-alpine
COPY ./package.json /usr/share/pardjs-service
COPY ./yarn.lock /usr/share/pardjs-service
RUN yarn
COPY . /usr/share/pardjs-service
RUN yarn run build
RUN ls ./dist -al
CMD yarn run start:prod
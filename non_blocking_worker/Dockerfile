FROM node:12.13.0-alpine

RUN mkdir -p /opt/app/

WORKDIR /opt/app/

RUN adduser -S app

COPY non-blocking-worker.js .
COPY package.json .

RUN npm install
RUN chown -R app /opt/app/

USER app

CMD [ "node", "non-blocking-worker.js" ]

FROM node:12.13.0-alpine

RUN mkdir -p /opt/app/

WORKDIR /opt/app/

RUN adduser -S app

COPY app.js .
COPY api api/
COPY package.json .
COPY public public/

RUN npm install
RUN chown -R app /opt/app/

USER app

CMD [ "node", "app.js" ]

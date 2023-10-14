FROM node:14
RUN npm install -g json-server
COPY . .
EXPOSE 5000
CMD ["json-server","--watch","db.json","--host","0.0.0.0","-p","5000"]

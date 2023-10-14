FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
RUN ls
COPY --from=builder /app/build /usr/share/nginx/html
RUN ls /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:18-alpine as builder
# WORKDIR /app
# COPY . .
# RUN npm install --force
# RUN npm run build

# FROM nginx:alpine
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
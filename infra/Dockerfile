FROM ubuntu:18.04 as build

ARG API_ADDR
RUN apt update -y
RUN apt install curl nodejs npm -y
RUN npm install npm@6 -g
RUN npm install -g n
RUN n 15

WORKDIR app

COPY . .
RUN npm install
RUN REACT_APP_API_ADDR=${API_ADDR} npm run build

FROM nginx:latest
COPY --from=build app/build /usr/share/nginx/html
COPY --from=build app/nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

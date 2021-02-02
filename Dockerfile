FROM ubuntu:18.04 as build

ARG API_ADDR
RUN apt update -y
RUN apt install nodejs npm -y
RUN npm install npm@6 -g

WORKDIR app

#COPY app/react .
#RUN npm install
#RUN npm run build

FROM nginx:latest
COPY --from=build app/build /usr/share/nginx/html
COPY --from=build app/nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

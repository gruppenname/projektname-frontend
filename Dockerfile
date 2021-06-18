# base image
FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

ENV VUE_APP_BACKEND_URL="https://gruppenname.demo.datexis.com"
# ENV VUE_APP_BACKEND_URL="http://127.0.0.1:5000"

RUN npm run build

FROM nginx
COPY ./deployment/nginx.conf /etc/nginx/
COPY --from=builder /app/dist /usr/share/nginx/html
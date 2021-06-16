# base image
FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
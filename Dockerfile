# build stage
FROM node:22-alpine AS build-stage

WORKDIR /app

COPY yarn.lock package*.json tsconfig.json ./

RUN yarn install 

COPY . .

RUN yarn build

# production stage
FROM nginx:1.27-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

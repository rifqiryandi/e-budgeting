# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
ADD dist /app/dist
# COPY package*.json ./
# RUN npm install --force
# COPY . .
# RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY .docker/nginx/prod.conf /temp/prod.conf
#RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

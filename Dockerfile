# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/student-details-system /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]

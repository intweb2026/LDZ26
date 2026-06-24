# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Set memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY package*.json ./
RUN npm install --legacy-peer-deps --maxsockets=5

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
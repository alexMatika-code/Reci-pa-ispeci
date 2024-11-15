# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*


# Copy the build output to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template
ENTRYPOINT ["/bin/sh", "-c", "envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]


# Expose port 80
EXPOSE 80

# Start Nginx with dynamic configuration
CMD ["nginx", "-g", "daemon off;"]
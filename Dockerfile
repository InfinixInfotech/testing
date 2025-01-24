# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . . 

# Build the application for production
RUN npm run build  # This will generate the build folder by default

# Use an official Nginx image to serve the app
FROM nginx:alpine AS production

# Copy the build output to Nginx's HTML folder
COPY --from=builder /app/build /usr/share/nginx/html  # Change 'dist' to 'build'

# Expose the default Nginx port (port 80)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

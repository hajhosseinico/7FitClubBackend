# Use the official Node.js image from Docker Hub
FROM node:20-alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install cors express mysql

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]


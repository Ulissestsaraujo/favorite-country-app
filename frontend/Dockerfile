# Use an official node image as the base
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the application
RUN npm install -g serve

# Set the command to serve the build
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000

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

# Expose port 4000 for the server
EXPOSE 4000

# Run the web service on container startup.
CMD ["node", "index.js"]

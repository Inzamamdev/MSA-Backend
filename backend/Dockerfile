# Use an official Node.js LTS image (alpine version for a smaller footprint)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port that your app runs on (adjust if needed)
EXPOSE 5000

# Run the server startup script (make sure you have a server.js that starts the app)
CMD ["node", "server.js"]

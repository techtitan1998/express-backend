# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Set the environment variable (if necessary)
# ENV NODE_ENV=production

# Expose the port on which the application will run
EXPOSE 3000

# Command to start your Node
# Command to start your Node.js application
CMD ["node", "./dist/index.js"]
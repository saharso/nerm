# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /nrm/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./backend/

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 3001

# Define the command to run your app
CMD ["node", "server.js"]

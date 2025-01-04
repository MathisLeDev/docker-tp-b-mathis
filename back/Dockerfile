# Use the official Node.js image
FROM node:23-alpine3.20

WORKDIR /app

# Copy only the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Ensure the correct environment file is in place
COPY .env.prod .env

# Build the application

# Expose the application port
EXPOSE 3001

# Command to start the application
CMD ["yarn", "start"]

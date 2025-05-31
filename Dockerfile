# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose app port
EXPOSE 3000

# Run app
CMD ["npm", "start"]

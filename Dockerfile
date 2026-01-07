# Use Node.js 20 Alpine
FROM node:20-alpine

# Install build dependencies for bcrypt (native module)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies (bcrypt will compile here)
RUN npm install --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "start"]


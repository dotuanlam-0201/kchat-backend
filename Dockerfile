# Use a specific node version for better stability
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that will be used
EXPOSE 8080

# Set NODE_ENV to production for better performance
ENV NODE_ENV=production

# Add a simple health check to debug startup issues
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8080} || exit 1

# Command to run the application
CMD ["node", "dist/main.js"]
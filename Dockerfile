# Simple Node.js http-server image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy project files into container
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Render provides PORT env var (default 10000)
EXPOSE 10000

# Run http-server
CMD ["sh", "-c", "http-server -p ${PORT:-10000} -a 0.0.0.0"]

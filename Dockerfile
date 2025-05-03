FROM node:18

# Set working directory INSIDE the container (doesn't need to exist on host)
WORKDIR /app

# Install Nest CLI (required to run nest build)
RUN npm install -g @nestjs/cli

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project
COPY . .

# Build your NestJS app (outputs to dist/)
RUN npm run build

# Expose app port
EXPOSE 3000

# Run compiled app
CMD ["node", "dist/src/main.js"]

# apps/ms-iam/Dockerfile
FROM node:alpine

WORKDIR /app

# Copy essential files to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy tsconfig and nest-cli configuration files
COPY tsconfig.json nest-cli.json ./

# Copy the desired microservice folder
COPY apps/ms-auth ./apps/ms-auth

#COPY . .

# Build the code
RUN npm run build ms-auth

# Run the microservice
CMD ["node", "dist/apps/ms-auth/main.js"]
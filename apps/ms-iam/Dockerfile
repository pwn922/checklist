# apps/ms-iam/Dockerfile
FROM node:alpine

WORKDIR /app

# Copy essential files to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install


COPY . .

# Build the code
RUN npm run build ms-iam

# Run the microservice
CMD ["node", "dist/apps/ms-iam/main.js"]
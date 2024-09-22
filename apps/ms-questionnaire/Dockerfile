# apps/ms-questionnaire/Dockerfile
FROM node:alpine

WORKDIR /app

# Copy essential files to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy tsconfig and nest-cli configuration files
COPY tsconfig.json nest-cli.json ./

# Copy the desired microservice folder
COPY apps/ms-questionnaire ./apps/ms-questionnaire

#COPY . .

# Build the code
RUN npm run build ms-questionnaire

# Run the microservice
CMD ["node", "dist/apps/ms-questionnaire/main.js"]
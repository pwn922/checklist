# apps/ms-questionnaire/Dockerfile
FROM node:alpine

WORKDIR /app

# Copy essential files to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install


COPY . .
# Copy NestJS and TypeScript configuration files
#COPY tsconfig*.json ./
#COPY nest-cli.json ./

# Copy the microservice source code
#COPY apps/ms-questionnaire ./apps/ms-questionnaire

# Build the code
RUN npm run build ms-questionnaire

# Run the microservice
CMD ["node", "dist/apps/ms-questionnaire/main.js"]
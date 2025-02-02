FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of the project
COPY . .

# Set environment variable
ENV PORT=5000
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

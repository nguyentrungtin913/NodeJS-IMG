# Dockerfile  
    FROM node:16.13.0 
    RUN mkdir -p /app
    WORKDIR /app
    COPY . /app
    EXPOSE 8080
    RUN npm install
    RUN npm run build
    COPY . .
    CMD ["npm", "start"]
# dev stage
FROM node:16-alpine AS dev

ENV NODE_ENV development

ARG API_URL
ENV API_URL=$API_URL

# setup workdir (next commands will run under this context, but also the running container will inherit this - if not overriden at runtime)
WORKDIR /usr/src/app/

# Build App
# - copy package.json and yarn.lock (optimise image build - copy only these files and run install, if these change rarely we can reuse this image layer too)
COPY package*.json ./

# - install packages (optimise image build - run just install after copying package.json, we hope these will change rarer as the code, so we can reuse this image layer too)
RUN npm install

# Copy the source code to the container
COPY . .

# Update the environment file with the API URL
RUN sed -i "s|apiUrl: '.*',|apiUrl: '${API_URL}',|" src/environments/environment.ts

EXPOSE 4200

# Start the app with ng serve
CMD ["npm", "start"]



# prod (and build) stages
FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the source code to the container
COPY . .

# Set the build arg for the API URL
ARG API_URL
ENV API_URL=$API_URL

# Update the environment file with the API URL
RUN sed -i "s|apiUrl: '.*',|apiUrl: '${API_URL}',|" src/environments/environment.prod.ts

# Build the app
RUN npm run build --configuration=production




# Nginx stage
FROM nginx:1.21.3-alpine AS prod

# Copy the built app to the Nginx HTML directory
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html

COPY nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# dev stage
FROM node:16-alpine as dev

ENV NODE_ENV development

ARG REACT_APP_BASE_API
ENV REACT_APP_BASE_API $REACT_APP_BASE_API

# setup workdir (next commands will run under this context, but also the running container will inherit this - if not overriden at runtime)
WORKDIR /usr/src/app/

# Add a group and user for code-server and nginx
RUN addgroup -g 1000 code-server-user && \
    adduser -D -u 1000 -G code-server-user code-server-user && \
    adduser code-server-user nginx

# Build App
# - copy package.json and yarn.lock (optimise image build - copy only these files and run install, if these change rarely we can reuse this image layer too)
COPY package*.json ./

# - install packages (optimise image build - run just install after copying package.json, we hope these will change rarer as the code, so we can reuse this image layer too)
RUN npm ci

# - copy the rest of the code (except the ones in .dockerignore) (optimise image build - we expect these to change everytime, so keep this as late as possible)
COPY . .

# Change ownership of the application source code
RUN chown -R code-server-user:code-server-user /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "watch"]


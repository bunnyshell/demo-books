FROM nginx:alpine as dev

RUN apk add --update yarn

ARG REACT_APP_APP_URL
ARG REACT_APP_BASE_API

ENV REACT_APP_APP_URL $REACT_APP_APP_URL
ENV REACT_APP_BASE_API $REACT_APP_BASE_API

# copy nginx config files
COPY .docker/files /

# setup workdir (next commands will run under this context, but also the running container will inherit this - if not overriden at runtime)
WORKDIR /var/www/frontend

# Build App
# - copy package.json and yarn.lock (optimise image build - copy only these files and run install, if these change rarely we can reuse this image layer too)
COPY package*.json ./
COPY yarn.lock ./

# - install packages (optimise image build - run just install after copying package.json, we hope these will change rarer as the code, so we can reuse this image layer too)
RUN yarn install

# - copy the rest of the code (except the ones in .dockerignore) (optimise image build - we expect these to change everytime, so keep this as late as possible)
COPY . .

# - build app
RUN yarn run build

EXPOSE 8081

CMD ["yarn", "run", "start"]

# - remove node_modules (optimize to keep image smaller; on prod you don't need them and on dev local you will have them when you mount the folders)


FROM nginx:alpine as prod

ARG REACT_APP_APP_URL
ARG REACT_APP_BASE_API

ENV REACT_APP_APP_URL $REACT_APP_APP_URL
ENV REACT_APP_BASE_API $REACT_APP_BASE_API

# copy config files
COPY .docker/files /

# setup workdir (next commands will run under this context, but also the running container will inherit this - if not overriden at runtime)
WORKDIR /var/www/frontend

COPY --from=dev /var/www/frontend/build ./build

EXPOSE 8080

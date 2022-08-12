FROM node:16 as dev

# setup workdir (next commands will run under this context, but also the running container will inherit this - if not overriden at runtime)
WORKDIR /usr/src/app/backend

# Build App
# - copy package.json and package-lock.json (optimise image build - copy only these files and run install, if these change rarely we can reuse this image layer too)
COPY package*.json ./

# - install packages (optimise image build - run just install after copying package.json, we hope these will change rarer as the code, so we can reuse this image layer too)
RUN npm install

# - copy the rest of the code (except the ones in .dockerignore) (optimise image build - we expect these to change everytime, so keep this as late as possible)
COPY . .

EXPOSE 3080

CMD ["npm", "run", "start"]


FROM node:16 as prod

WORKDIR /usr/src/app/backend

COPY --from=dev /usr/src/app/backend .

EXPOSE 3080

CMD [ "node", "server.js" ]
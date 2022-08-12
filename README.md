# Bunnyshell Books - Demo App

This app is a CRUD example, composed out of a frontend, one backend service and one database.
Its purpose is to illustrate how you can quickly get started with Bunnyshell.

Summary of app functional requirements:
- Each Book has id, title, description, availability status.
- We can create, retrieve, update, delete Books.
- There is a Search bar for searching Books by title.

Inspired from:
- https://github.com/bezkoder/react-axios-typescript-example
- https://github.com/bezkoder/react-axios-typescript-example


Summary of app functional requirements:
- Each Book has id, title, description, availability status.
- We can create, retrieve, update, delete Books.
- There is a Search bar for searching Books by title.


## Development
Copy the `.env.sample` to `.env` in order to have env vars for development, as the defaults are set to work with Bunnyshell, in prod mode.

Add the following line to `/etc/hosts`

```
127.0.0.1 books.local.bunnyshell.com books-api.local.bunnyshell.com
```

## Projects setup

In each project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

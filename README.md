# Bunnyshell Books - Demo App with Xata

This app is a CRUD example, composed out of a frontend, one backend service and one [Xata](https://xata.io) database.
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

Add the following line to `/etc/hosts` on your local machine

```
127.0.0.1 books.local.bunnyshell.com books-api.local.bunnyshell.com
```

To create the Xata database, [create an account and sign-in to Xata](https://app.xata.io), then create a new database named `books`. Then:

- install the Xata CLI:

```
npm install @xata.io/cli@latest -g
```

- initialize the database with this command:

```
xata init --schema ./backend/schema.json --codegen=backend/app/models/xata.js --module=cjs
```

When prompted, select the `books` database that you have created.

Then, just run `docker compose up` and open the apps:
- frontend http://books.local.bunnyshell.com:8081
- backend http://books-api.local.bunnyshell.com:3080

## Projects setup & run

In each project directory, you can run:

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

## Deployment
The backend service can be deployed using the existing Helm Chart and the frontend app can be deployed using the existing Kubernetes manifest files.

### Using the backend Helm Chart
Available parameters that you can customize and write to a `my_values.yaml` file, for example.
|Name|Description|Value|
|---|---|---|
|serviceImage|An existing built image for the service|""|
|replicas|The number of replicas|1|
|ingress.className|The ingress class name to be used|nginx|
|ingress.host|The host that the ingress resource will use|example.com|
|frontendUrl|The URL of the frontend application|https://example.com|

```
helm install -f my_values.yaml my-release ./helm/backend
```

### Using the frontend Kubernetes manifests
```
kubectl apply -f ./manifests/frontend
```
You can alter / configure the raw manifests using different tools, like Kustomize & sed:
```
cd manifests/frontend

kustomize create --autodetect --recursive --namespace=my-custom-namespace

kustomize edit set image needsimage=mybuiltimage:latest

kustomize edit add patch --kind Deployment --name frontend --patch '[{"op": "add", "path": "/spec/template/spec/containers/0/env/-", "value": {"name": "ENV", "value": "staging"}}]'

sed -i "s/frontend.example.com/kmyhost.myapp.com/g" ingress.yaml

kubectl apply -k .'
```

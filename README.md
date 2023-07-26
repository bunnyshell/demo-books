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

Add the following line to `/etc/hosts` on your local machine

```
127.0.0.1 books.local.bunnyshell.com books-api.local.bunnyshell.com
```

Then, just run `docker compose up` and open the apps:
- frontend http://books.local.bunnyshell.com:8080
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
|postgres.host|The database server host|db| 
|postgres.db|The database initial database name|bunny_books|
|postgres.user|The database authentication username|postgres|
|postgres.password|The database authentication password|pass|
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

---
template: BlogPost
path: /dockerize-a-remix-react-app-with-mariadb
date: 2023-07-22T13:24:56.203Z
title: Dockerize a Remix React app with MariaDB
thumbnail: /assets/edwardsmoses_docker_remix.png
---

<!--StartFragment-->

## Introduction

I've mentioned how much I've enjoyed working with Remix [in the past](https://edwardsmoses.com/guide-to-accepting-payments-with-stripe-in-remix-run); in this blog post, we'll explore how we can dockerize a Remix app along with MariaDB as the application database

## Prerequisites

- Have [Docker](https://www.docker.com/products/docker-desktop) installed on your PC.
- Basic understanding of how a Remix application is structured.

## Getting started

We'll be starting with two primary elements:

- the `Dockerfile`: this is a simple text file containing instructions on how to create a Docker images. In a simple dockerfile, we would typically have instructions to install the app dependencies, build the application, and setup the start command that'll be running the application.
- Docker Compose: We'll be using `docker-compose.yml` to configure the application and it's accompanying database.

Ok, let get's started. First, let's create an empty file called Dockerfile in the app base directory:

```sh
touch dockerfile
```

The file contents:

```dockerfile
# base node image
FROM node:16-bullseye-slim as base

# Install all node_modules, including dev dependencies
FROM base as deps
RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .
CMD ["npm", "run", "start"]

```

The Dockerfile begins with defining a base image `node:16-bullseye-slim`. It then follows through various stages namely deps, production-deps, build, and the final stage.

In the deps stage, it creates an application directory, copies over the package files, and runs `npm install` to install all dependencies including dev dependencies.

In the production-deps stage, it copies the installed dependencies from deps stage and prunes any dev dependencies, leaving behind only the production dependencies.

In the build stage, it copies the application files and runs npm run build to create a production build of our application.

Finally, it copies the `node_modules` from the production-deps and the build from the build stage into the final image.

It sets the command `CMD ["npm", "run", "start"]` to start the server when the container is run.

## Docker Compose

Now, let's create a `docker-compose.yml` file.

```yaml
version: '3.1'
services:
  mariadb:
    image: mariadb:latest
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app_db
      MYSQL_USER: user
      MYSQL_PASSWORD: pwd
    volumes:
      - app_mariadb_data:/var/lib/mysql
      - ./db:/docker-entrypoint-initdb.d

  app:
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    depends_on:
      - mariadb

volumes:
  app_mariadb_data:

```

This Docker Compose file sets up two services: mariadb and app.

The mariadb service pulls the latest `mariadb` image from Docker, binds the port `3306` (standard MariaDB port), and sets up a few environment variables for the database setup.
It also defines two volumes, one for persisting database data and the other for initializing the database.

The app service is built from the `Dockerfile` in the current app directory, and it binds port `3000` to the host.
It is also configured to depend on the mariadb service, which means the app service will start only after the mariadb service is up and running.

The volumes section at the end defines a named volume `app_mariadb_data` for storing MariaDB's data. This helps in persisting data across container restarts.

## Initializing our MariaDB database

In the above `docker-compose.yml` file, we specified a volume for initializing the MariaDB. In most applications, this is a crucial step, as it typically involves creating the necessary database schemas and seeding initial data.

In our `docker-compose.yml`, we mapped `./db:/docker-entrypoint-initdb.d` meaning that we can place our initialization SQL files into the `db` directory in our project and Docker will automatically execute these scripts upon initialization.

For example, suppose you have an SQL script `init.sql` that you want to use to initialize your database. You would place this file in the `db` directory:

```sql
/* Sample init.sql file */

/* Create a table named 'users' */
CREATE TABLE users(
   id int auto_increment,
   name VARCHAR(40) NOT NULL,
   email VARCHAR(60) NOT NULL UNIQUE,
   primary key(id)
);

/* Seed initial data */
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')
```

With the above script in the `db` directory and the mapping we have in our `docker-compose.yml`.

When the container starts for the first time, the `users` table will be created in the `app_db` database, and the initial user data will be inserted.

Using this initialization capability, we can easily automate the setup of your database.

## Additional configurations

We could also add a `.dockerignore` file in the same directory as our `Dockerfile`, and add the following:

```dockerignore
node_modules
npm-debug.log
```

The above would prevent the `node_modules` and debug logs from been copied into our resulting Docker image.

## Running

Now, to get the whole system running, you just need to run the following command in the directory containing the Dockerfile and docker-compose.yml:

```bash
docker-compose up
```

And, we can then visit our application at `http://localhost:3000/`

### Done

And yes!! yes!! We are done!!!!

The Working version of this article is available on GitHub —
<https://github.com/edwardsmoses/remix-run-docker-sample>

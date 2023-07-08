# Fudy test task

## Installation

```bash
$ cp .env.example .env
$ npm i
```

## Running the app

```bash
$ docker compose --env-file .env up
```

The `postgres` image will execute the `db/init.sql` script that will create `users` table
(see `docker-compose.yaml`).

For dev (watch) mode use
```bash
$ docker compose -f docker-compose.dev.yaml --env-file .env up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

- Docker Compose
- API versioning (`/api/v1` prefix)
- Layering
- Swagger docs (available at `localhost:3000/api`)
- Prefering Repository pattern over ORM

## Limitations

- Sequential ID must not be used for production due to [2013-A4-Insecure Direct Object References](https://wiki.owasp.org/index.php/Top_10_2013-A4-Insecure_Direct_Object_References) vulnerability. But no need to complicate things for this simple test task.
- DB migrations won't be possible with current DB initialization method.
- Refresh token is not included to the response of POST api/v1/auth/login for simplicity.
- Access token doesn't expire.
- No logging.
- No testing, only lib/tools/passwords.ts is covered.

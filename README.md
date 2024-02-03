# AppSecureCheck

## Pre requisites
We need to have installed
* `Nodejs v18.19.0`
* `docker- docker compose`
* `pnpm` as package manager globally

### Run docker compose

In the root directory run `docker compose up -d`

NOTE: inf you want you can change docker file settings

### Install package
run `pnpm install`

if you dont have the correct version you can use `nvm` and just run `nvm install` automatically you are going to use the correct version.

### Run backend

run `nx serve backend`

You should need to have an `.env`file. you can use as reference the `env.example`. it has locahost configuration

### Run frontend

run `nx serve frontend`

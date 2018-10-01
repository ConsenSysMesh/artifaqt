# Artifaqt contracts

## Local development

### First setup
```bash
npm i
```

Locally installs npm packages needed for development


### Start local ethereum server
```bash
npm run dev
```

Starts a `ganache` docker container with a fixed seed on port `7545`.

### Run tests
```bash
npm run test
```

It will run all tests. It needs to have a running local ethereum server on port `7545`

### Stop local ethereum server
```
npm run dev-stop
```

It kills and removes the ganache docker container.

## Contribuition guide

- Create pull requests or merge requests, do not push directly to master.
- Make sure tests work before creating request.

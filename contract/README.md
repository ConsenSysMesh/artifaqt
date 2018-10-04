# Artifaqt contracts

## Local development

### First setup
```shell
$ npm i
```

Locally installs npm packages needed for development


### Start local ethereum server
```shell
$ npm run dev
```

Starts a `ganache` docker container with a fixed seed on port `7545`.

### Run tests
```shell
$ npm run test
```

It will run all tests. It needs to have a running local ethereum server on port `7545`

### Stop local ethereum server
```shell
$ npm run dev-stop
```

It kills and removes the `ganache` docker container.

## Contribuition guide

- Create pull requests or merge requests, do not push directly to master.
- Make sure tests work before creating request.

## Claiming tokens

In order to claim tokens, the `player` needs to make a call to `claimToken()`.

The definition of `claimToken()` is

```solidity
function claimToken(bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s, bytes32 _sin)
```

- `_signature` - `_sin` signed by player.
- `_v`, `_r`, `_s` - values from the signature; enable signature checking
- `_sin` - payload that was signed by the player.

### Constructing the `_sin` payload

In order to have a different payload for each player for each station, a 
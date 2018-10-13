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
function claimToken(bytes32 _message, uint8 _v, bytes32 _r, bytes32 _s, bytes32 _sin, uint256 _sinIndex)
```

### Constructing the `_sin` payload

In order to have a different payload for each player and for each station, a unique payload needs to be constructed. I wanted to deter people from monitoring the transactions happening on the chain and just replicating what the others are doing.

These are the basic steps, but also refer to the [proof of concept](proof-of-concept/) for a really ugly javascript implementation.

#### 1. Obtain the message.

Each station provides a QR Code after a confession was made. The QR Code is a JSON that looks like this
```javascript
{
    sin: "Those who were never baptised.",
    sinIndex: 0
}
```

> We should should discuss a little bit the format and see if other information needs to be added or we should optimize the size of it.

#### 2. Sign the message with the user's account.

The scheme for the message signing is a bit complicated to put in words. Refer to the [claimToken()](proof-of-concept/app.js#L80) function.

Let's try to use words though:
- the `sin` key is hashed with `web3.utils.sha3()`
```javascript
sinHash = web3.utils.sha3(`Those who were never baptised.`)
// sinHash: 0xfc3fe4f31dfabb1d4f80738b0c84c940483c755284943811599526cb3d4bd237
```
- concatenate the hash with the user's address (without the `0x` prefix)
```javascript
sinPayload = sinHash + web3.eth.defaultAccount.substr(2)
// sinPayload: `0xfc3fe4f31dfabb1d4f80738b0c84c940483c755284943811599526cb3d4bd237` + `6732241492062041bbc79d26d43aba1d99216895`
sinPayloadHash = web3.utils.sha3(sinPayload, {encoding: 'hex'})
// sinPayloadHash: `0x6b8d90befe936e2c2e278ea4357743d10b12ae133420e020748bd4391d433e15`
```
- the `sinPayloadHash` will be signed by the player's account
The required parameters look like this
```javascript
r = 0x831f96ac65cda178d513a919903e2dfd5d5aad6d447ac7d599dab7c570eec58c
s = 0x0c6b3ef60115afa8b2620b616538897308df61fefdf201ca8f886d7149637e9d
v = 0x1b
vDecimal = 27
prefixedMsg = Ethereum Signed Message:
660x6b8d90befe936e2c2e278ea4357743d10b12ae133420e020748bd4391d433e15
prefixedMsgHash = 0xe7d21d42645d5273c3d357ae12f1e3f43a5fe57042d6a085492a86c6c978aff5
```

I do suggest reading [the code](proof-of-concept/app.js) it's much clearer.

#### 3. The hashed message and signature are sent to the smart contract.
- the generated parameters sent to the contract
```javascript
artifaqt.methods.claimToken(
    prefixedMsgHash,
    vDecimal,
    r,
    s,
    sinPayloadHash,
    sinIndex,
)
```

- which in turn sends the NFT to the player


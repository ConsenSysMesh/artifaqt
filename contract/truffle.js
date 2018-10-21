const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')

// First read in the secrets.json to get our mnemonic
let secrets
let mnemonic
let infuraKey
if (fs.existsSync('secrets.json')) {
    secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))
    mnemonic = secrets.mnemonic
    infuraKey = secrets.infuraKey
} else {
    console.log('No secrets.json found. If you are trying to publish EPM ' +
        'this will fail. Otherwise, you can ignore this message!')
    mnemonic = ''
}

module.exports = {
    // 
    solc: {
        optimizer: {
            enabled: true,
            runs: 1000,
        },
    },

    //
    networks: {
        ganache: {
            host: 'localhost',
            port: 7545,
            network_id: '42', // eslint-disable-line camelcase
            gasPrice: 0x01,
        },
        coverage: {
            host: "localhost",
            network_id: "*",
            port: 8555,
            gas: 0xfffffffffff,
            gasPrice: 0x01
        },
        ropsten: {
            provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + infuraKey),
            network_id: '3'
        },
    },
};

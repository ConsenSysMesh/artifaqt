module.exports = {
    networks: {
        // Start
        // $ npm run dev
        // Stop 
        // $ npm run dev-stop
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
    },
};

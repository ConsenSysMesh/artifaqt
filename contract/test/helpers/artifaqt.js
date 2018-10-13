module.exports = {
    createClaimTokenPayload: (sin, player) => web3.sha3(web3.sha3(sin) + player.substr(2), { encoding: 'hex' }),
};

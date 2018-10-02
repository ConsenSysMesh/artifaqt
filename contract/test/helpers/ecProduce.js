const { toHex } = require('../helpers/toHex');

module.exports = {
    ecProduce: (message, address) => {
        const signature = web3.eth.sign(address, `0x${toHex(message)}`).substr(2);
        const v = `0x${signature.slice(128, 130)}`;
        let vDecimal = web3.toDecimal(v);
        if (vDecimal !== 27 || vDecimal !== 28) {
            vDecimal += 27;
        }
        const r = `0x${signature.slice(0, 64)}`;
        const s = `0x${signature.slice(64, 128)}`;

        const prefixedMsg = `\x19Ethereum Signed Message:\n${message.length}${message}`;
        const prefixedMsgHash = web3.sha3(prefixedMsg);

        return {
            message,
            r,
            s,
            v,
            vDecimal,
            prefixedMsg,
            prefixedMsgHash,
        };
    },
};

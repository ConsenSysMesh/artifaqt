const { toHex } = require('./toHex');

module.exports = {
    /// @notice Signs a string message with your address
    /// @dev 
    /// @param message The string that will be signed
    /// @param address The unlocked account that will sign the message
    /// @return an object containing
    ///     r, s, v: Values in hex form (with leading 0x) for the signature
    ///     vDecimal: Decimal value of `v`
    ///     prefixedMsg: Full hashed string; containing the required prefix `\x19Ethereum Signed Message:\n${message.length}`
    ///     prefixedMsgHash: Hash of `prefixedMsg`
    signMessage: (message, address) => {
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
            r,
            s,
            v,
            vDecimal,
            prefixedMsg,
            prefixedMsgHash,
        };
    },
    /// @notice Same as signMessage, but the hexMessage argument is a hexString with leading 0x
    /// @dev hexMessage must have leading `0x`
    /// @param message The string that will be signed
    /// @param address The unlocked account that will sign the message
    /// @return an object containing
    ///     r, s, v: Values in hex form (with leading 0x) for the signature
    ///     vDecimal: Decimal value of `v`
    ///     prefixedMsg: Full hashed string; containing the required prefix `\x19Ethereum Signed Message:\n${message.length}`
    ///     prefixedMsgHash: Hash of `prefixedMsg`
    signHexMessage: (hexMessage, address) => {
        const signature = web3.eth.sign(address, hexMessage.substr(2)).substr(2);
        const v = `0x${signature.slice(128, 130)}`;
        let vDecimal = web3.toDecimal(v);
        if (vDecimal !== 27 || vDecimal !== 28) {
            vDecimal += 27;
        }
        const r = `0x${signature.slice(0, 64)}`;
        const s = `0x${signature.slice(64, 128)}`;

        const prefixedMsg = `\x19Ethereum Signed Message:\n${hexMessage.length}${hexMessage}`;
        const prefixedMsgHash = web3.sha3(prefixedMsg);

        return {
            hexMessage,
            r,
            s,
            v,
            vDecimal,
            prefixedMsg,
            prefixedMsgHash,
        };
    },
};

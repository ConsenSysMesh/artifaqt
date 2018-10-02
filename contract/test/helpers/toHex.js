module.exports = {
    toHex: (str) => {
        let hex = '';
        for (let i = 0; i < str.length; i += 1) {
            hex += `${str.charCodeAt(i).toString(16)}`;
        }
        return hex;
    },
};

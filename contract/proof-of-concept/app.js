let artifaqt;

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    artifaqt = new web3js.eth.Contract(contractABI, contractAddress);

    setTimeout(getTokenNumber, 1000);
});

function getTokenNumber() {
    artifaqt.methods.balanceOf(web3.eth.defaultAccount).call({ from: web3.eth.defaultAccount }).then(function (result)
    {   
        $('#tokenNumber').text(result);
        setTimeout(getTokenNumber, 1000);
    });
}

function toHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i += 1) {
        hex += `${str.charCodeAt(i).toString(16)}`;
    }
    return hex;
}

function signMessageAndSend(message, address, sinPayloadHash, sinIndex) {
    web3js.eth.personal.sign(
        `0x${toHex(message)}`,
        address,
        ""
    ).then(function (signature) {
        console.log(`signature = ${signature}`);

        signature = signature.substr(2);

        const v = `0x${signature.slice(128, 130)}`;
        let vDecimal = web3.toDecimal(v);
        if (vDecimal !== 27 && vDecimal !== 28) {
            vDecimal += 27;
        }
        const r = `0x${signature.slice(0, 64)}`;
        const s = `0x${signature.slice(64, 128)}`;
    
        const prefixedMsg = `\x19Ethereum Signed Message:\n${message.length}${message}`;
        const prefixedMsgHash = web3js.utils.sha3(prefixedMsg);

        console.log(`r = ${r}`);
        console.log(`s = ${s}`);
        console.log(`v = ${v}`);
        console.log(`vDecimal = ${vDecimal}`);
        console.log(`prefixedMsg = ${prefixedMsg}`);
        console.log(`prefixedMsgHash = ${prefixedMsgHash}`);
        
        artifaqt.methods.claimToken(
            prefixedMsgHash,
            vDecimal,
            r,
            s,
            sinPayloadHash,
            sinIndex,
        ).send({ from: web3.eth.defaultAccount })
            .on('transactionHash', function (hash) { 
                console.log(`hash = ${hash}`);
            }).on('receipt', function (confirmationNumber, receipt) {
                console.log(`confirmationNumber = ${confirmationNumber}`);
                console.log(`receipt = ${receipt}`);
            }).on('error', console.error);
    });
}

function claimToken() {
    sinHash = web3js.utils.sha3(QRCodeData.sin);
    sinPayloadHash = web3js.utils.sha3(sinHash + web3.eth.defaultAccount.substr(2), { encoding: 'hex' });
    sinIndex = QRCodeData.sinIndex;

    console.log(`sinHash = ${sinHash}`);
    console.log(`sinPayloadHash = ${sinPayloadHash}`);

    signMessageAndSend(sinPayloadHash, web3.eth.defaultAccount, sinPayloadHash, sinIndex);
}
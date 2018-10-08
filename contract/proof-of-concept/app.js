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

function claimToken() {
    sinHash = web3js.utils.sha3(QRCodeData.sin);
    sinPayloadHash = web3js.utils.sha3(sinHash + web3.eth.defaultAccount.substr(2), { encoding: 'hex' });
    sinIndex = QRCodeData.sinIndex;

    console.log(`sinHash = ${sinHash}`);
    console.log(`sinPayloadHash = ${sinPayloadHash}`);

    artifaqt.methods.claimToken(
        sinPayloadHash,
        sinIndex,
    ).send({ from: web3.eth.defaultAccount })
        .on('transactionHash', function (hash) { 
            console.log(`hash = ${hash}`);
        }).on('receipt', function (confirmationNumber) {
            console.log(`confirmationNumber = ${confirmationNumber.blockNumber}`);
        }).on('error', console.error);
}
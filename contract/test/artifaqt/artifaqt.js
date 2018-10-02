

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Account that plays the game nicely
let player;

// Account that tries to hack the game
let hacker;

// Contract instance
let artifaqt;

// TODO: remove this
function toHex(str) {
    let hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16)
    }
    return hex;
}

contract('Artifaqt', (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });

        player = accounts[1];
        hacker = accounts[9];
    });

    it('creation: deploy with name', async () => {
        assert.strictEqual('Artifaqt', await artifaqt.name.call());
        assert.strictEqual('ATQ', await artifaqt.symbol.call());
    });

    it('claim token: send signed message to receive token', async () => {
        let msg = "Those who were never baptised.";
        let signature = web3.eth.sign(player, "0x" + msg);
        let r = "0x" + signature.slice(0, 64);
        let s = "0x" + signature.slice(64, 128);
        let v = "0x" + signature.slice(128, 130);
    });
});
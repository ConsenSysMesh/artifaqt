const { signMessage } = require('../helpers/signMessage');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Account that plays the game nicely
let player;

// Account that tries to hack the game
// let hacker;

// Contract instance
let artifaqt;

let sins = [
    'Those who were never baptised',
];

contract('Artifaqt', (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });

        player = accounts[1];
        // hacker = accounts[9];
    });

    it('creation: deploy with name', async () => {
        assert.strictEqual(await artifaqt.name.call(), 'Artifaqt');
        assert.strictEqual(await artifaqt.symbol.call(), 'ATQ');
    });

    it('claim token: we can recover the address from the signature', async () => {
        const {
            prefixedMsgHash,
            vDecimal,
            r,
            s,
        } = signMessage('Any kind of message', player);

        assert.strictEqual(
            await artifaqt.recoverAddr.call(
                prefixedMsgHash,
                vDecimal,
                r,
                s,
            ),
            player,
        );
    });

    it('claim token: Limbo can be claimed', async () => {
        const sin = sins[0];
        const sinHash = web3.sha3(web3.sha3(sin));
        const {
            prefixedMsgHash,
            vDecimal,
            r,
            s,
        } = signMessage(sinHash, player);

        let c = await artifaqt.claimToken(prefixedMsgHash, vDecimal, r, s, sin, { from: player });
        console.log(c);

        console.log("prefixedMsgHash = " + prefixedMsgHash);
        console.log("vDecimal = " + vDecimal);
        console.log("r = " + r);
        console.log("s = " + s);

        console.log(web3.sha3(sin));
        console.log(sinHash);

        let b = await artifaqt.balanceOf.call(player);
        console.log("token count =" + b.toNumber());

        assert.equal(
            await artifaqt.balanceOf.call(player),
            1
        );
    });
});

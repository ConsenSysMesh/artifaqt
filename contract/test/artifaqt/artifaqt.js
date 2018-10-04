const { signMessage, signHexMessage } = require('../helpers/signMessage');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Account that plays the game nicely
let player;

// Account that tries to hack the game
let hacker;

// Contract instance
let artifaqt;

let sins = {
    'limbo': 'Those who were never baptised.',
    'lust': 'Those who gave into pleasure.',
    'gluttony': 'Those who indulged in excess.',
    'avarice': 'Those who hoard and spend wastefully.',
    'wrath': 'Those consumed by anger and hatred.',
    'heresy': 'Those who worshipped false idols.',
    'violence': 'Those violent against others, one’s self, and God.',
    'fraud': 'Those who used lies and deception for personal gain.',
    'treachery': 'Those who have betrayed their loved ones.',
};

contract('Artifaqt', (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });

        player = accounts[1];
        hacker = accounts[9];
    });

    it('creation: deploy with name', async () => {
        assert.strictEqual(await artifaqt.name.call(), 'Artifaqt');
        assert.strictEqual(await artifaqt.symbol.call(), 'ATQ');
    });

    it('signature: we can recover the address from the signature', async () => {
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

    it('signature: can verify an address signed a message', async () => {
        const {
            prefixedMsgHash,
            vDecimal,
            r,
            s,
        } = signMessage('Any kind of message', player);

        assert.isTrue(
            await artifaqt.isSigned.call(
                player,
                prefixedMsgHash,
                vDecimal,
                r,
                s,
            ),
        );
    })

    it('claim token: Limbo', async () => {
        const sin = web3.sha3(sins['limbo'])
        const sinPayload = sin + player.substr(2); // Limbo sin
        const sinHash = web3.sha3(sinPayload, {encoding: 'hex'});
        const {
            prefixedMsgHash,
            vDecimal,
            r,
            s,
        } = signMessage(sinHash, player);

        console.log(`sinHash = ${sinHash}`);
        console.log(`player = ${player}`);

        await artifaqt.claimToken(prefixedMsgHash, vDecimal, r, s, sinHash, { from: player });

        assert.equal(
            (await artifaqt.balanceOf.call(player)).toNumber(),
            1
        );
    });
});

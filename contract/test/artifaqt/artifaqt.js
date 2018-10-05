const { signMessage } = require('../helpers/signMessage');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Account that plays the game nicely
let player;

// Account that tries to hack the game
let hacker;

// Contract instance
let artifaqt;

const sins = [
    // limbo
    'Those who were never baptised.',
    // lust
    'Those who gave into pleasure.',
    // gluttony
    'Those who indulged in excess.',
    // avarice
    'Those who hoard and spend wastefully.',
    // wrath
    'Those consumed by anger and hatred.',
    // heresy
    'Those who worshipped false idols.',
    // violence
    'Those violent against others, one’s self, and God.',
    // fraud
    'Those who used lies and deception for personal gain.',
    // treachery
    'Those who have betrayed their loved ones.',
];

contract('Artifaqt', (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });

        const receipt = await web3.eth.getTransactionReceipt(artifaqt.transactionHash);

        assert.isBelow(receipt.gasUsed, 3400000);

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
    });

    it('temp: hex to string', async () => {
        const hash = web3.sha3('abcd');

        await artifaqt.hashToString(hash);

        assert.strictEqual(
            await artifaqt.hashToString.call(hash),
            '0x48bed44d1bcd124a28c27f343a817e5f5243190d3c52bf347daf876de1dbbf77',
        );
    });

    it('claim token: claim each token', async () => {
        for (let sinIndex = 0; sinIndex < 9; sinIndex += 1) {
            const sinHash = web3.sha3(sins[sinIndex]);
            const sinPayload = sinHash + player.substr(2);
            const sinPayloadHash = web3.sha3(sinPayload, { encoding: 'hex' });
            const {
                prefixedMsgHash,
                vDecimal,
                r,
                s,
            } = signMessage(sinPayloadHash, player);

            let c = await artifaqt.claimToken(
                prefixedMsgHash,
                vDecimal,
                r,
                s,
                sinPayloadHash,
                sinIndex,
                { from: player },
            );

            // TODO: optimize gas cost
            console.log(`gasUsed = ${c.receipt.gasUsed}`);

            assert.equal(
                (await artifaqt.balanceOf.call(player)).toNumber(),
                sinIndex + 1,
            );
        }
    });
});

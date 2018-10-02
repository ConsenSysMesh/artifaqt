const { ecProduce } = require('../helpers/ecProduce');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Account that plays the game nicely
let player;

// Account that tries to hack the game
// let hacker;

// Contract instance
let artifaqt;

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

    // TODO: check token was sent back to the player for signing the correct message
    it('claim token: send signed message to receive token', async () => {
        const {
            prefixedMsgHash,
            vDecimal,
            r,
            s,
        } = ecProduce('Those who were never baptised', player);

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
});

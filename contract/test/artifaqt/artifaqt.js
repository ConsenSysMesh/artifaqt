const { assertRevert } = require('../helpers/assertRevert');
const { createClaimTokenPayload } = require('../helpers/artifaqt');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Accounts that play the game nicely
let player;
let player2;

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

        // Nice players
        player = accounts[1];
        player2 = accounts[2];

        // Bad players
        hacker = accounts[9];
    });

    it('creation: deploy with name', async () => {
        assert.strictEqual(await artifaqt.name.call(), 'Artifaqt');
        assert.strictEqual(await artifaqt.symbol.call(), 'ATQ');
    });

    it('claim token: claim each token', async () => {
        for (let sinIndex = 0; sinIndex < 9; sinIndex += 1) {
            const sinPayloadHash = createClaimTokenPayload(sins[sinIndex], player);

            await artifaqt.claimToken(
                sinPayloadHash,
                sinIndex,
                { from: player },
            );

            // TODO: optimize gas cost
            // console.log(`gasUsed = ${c.receipt.gasUsed}`);

            assert.equal(
                (await artifaqt.balanceOf.call(player)).toNumber(),
                sinIndex + 1,
            );
        }
    });

    it('claim token: hacker cannot claim token for himself', async () => {
        const sinIndex = 0;

        // Use a payload that a user created
        const sinPayloadHash = createClaimTokenPayload(sins[sinIndex], player);

        await assertRevert(artifaqt.claimToken(
            sinPayloadHash,
            sinIndex,
            { from: hacker },
        ));

        assert.equal(
            (await artifaqt.balanceOf.call(hacker)).toNumber(),
            0,
        );
    });

    it('claim token: player claims token of each type', async () => {
        for (let sinIndex = 0; sinIndex < 9; sinIndex += 1) {
            const sinPayloadHash = createClaimTokenPayload(sins[sinIndex], player);

            const claimTokenResult = await artifaqt.claimToken(
                sinPayloadHash,
                sinIndex,
                { from: player },
            );

            const tokenId = claimTokenResult.logs[0].args.tokenId.toNumber();

            // Make sure the player claimed an additional token
            assert.equal(
                (await artifaqt.balanceOf.call(player)).toNumber(),
                sinIndex + 1,
            );

            // Get token to test if it was generated correctly for player
            const token = await artifaqt.getToken.call(tokenId);

            // Token id
            assert.equal(token[0].toNumber(), tokenId, 'token id not as expected');

            // Token owner
            assert.equal(token[1], player, 'token owner does not match player');

            // Token type
            assert.equal(token[2].toNumber(), sinIndex, 'token type not as expected');
        }
    });

    it('claim token: multiple players claim different tokens', async () => {
        const claimTokenResultPlayer1 = await artifaqt.claimToken(
            createClaimTokenPayload(sins[0], player),
            0,
            { from: player },
        );

        const claimTokenResultPlayer2 = await artifaqt.claimToken(
            createClaimTokenPayload(sins[1], player2),
            1,
            { from: player2 },
        );

        // Token id
        assert.notEqual(
            claimTokenResultPlayer1.logs[0].args.tokenId,
            claimTokenResultPlayer2.logs[0].args.tokenId,
            'token ids must be different',
        );

        // Token type
        assert.equal(
            claimTokenResultPlayer1.logs[0].args.sinType.toNumber(),
            0,
            'token type must be 0 for player 1',
        );
        assert.equal(
            claimTokenResultPlayer2.logs[0].args.sinType.toNumber(),
            1,
            'token type must be 1 for player 2',
        );

        // Token owner
        assert.equal(
            claimTokenResultPlayer1.logs[0].args.player,
            player,
            'owner of token must be player 1',
        );
        assert.equal(
            claimTokenResultPlayer2.logs[0].args.player,
            player2,
            'owner of token must be player 2',
        );

        const token1 = await artifaqt.getToken.call(claimTokenResultPlayer1.logs[0].args.tokenId);
        const token2 = await artifaqt.getToken.call(claimTokenResultPlayer2.logs[0].args.tokenId);

        // Token id
        assert.equal(token1[0].toNumber(), claimTokenResultPlayer1.logs[0].args.tokenId);
        assert.equal(token2[0].toNumber(), claimTokenResultPlayer2.logs[0].args.tokenId);

        // Token owner
        assert.equal(token1[1], player);
        assert.equal(token2[1], player2);

        // Token type
        assert.equal(token1[2].toNumber(), 0);
        assert.equal(token2[2].toNumber(), 1);
    });
});

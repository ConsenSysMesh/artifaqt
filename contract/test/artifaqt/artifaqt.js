const { assertRevert } = require('../helpers/assertRevert');
const { createClaimTokenPayload } = require('../helpers/artifaqt');
const { sins } = require('./config');

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

contract('Artifaqt', async (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });

        await web3.eth.getTransactionReceipt(artifaqt.transactionHash);

        // Nice players
        player = accounts[1];
        player2 = accounts[2];

        // Bad players
        hacker = accounts[9];
    });

    it('claim token: hacker cannot claim token for himself', async () => {
        const sinIndex = 0;

        // Use a payload that a player created
        const sinPayloadHash = createClaimTokenPayload(sins[sinIndex], player);

        await assertRevert(artifaqt.claimToken(
            sinPayloadHash,
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
                { from: player },
            );

            const tokenId = claimTokenResult.logs[0].args._tokenId.toNumber();

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
            { from: player },
        );

        const claimTokenResultPlayer2 = await artifaqt.claimToken(
            createClaimTokenPayload(sins[1], player2),
            { from: player2 },
        );

        // Token id
        assert.notEqual(
            claimTokenResultPlayer1.logs[0].args._tokenId,
            claimTokenResultPlayer2.logs[0].args._tokenId,
            'token ids must be different',
        );

        const tokenPlayer1 = await artifaqt.getToken.call(
            claimTokenResultPlayer1.logs[0].args._tokenId,
        );
        const tokenPlayer2 = await artifaqt.getToken.call(
            claimTokenResultPlayer2.logs[0].args._tokenId,
        );

        // Token type
        assert.equal(
            tokenPlayer1[2].toNumber(),
            0,
            'token type must be 0 for player 1',
        );
        assert.equal(
            tokenPlayer2[2].toNumber(),
            1,
            'token type must be 1 for player 2',
        );

        // Token owner
        assert.equal(
            claimTokenResultPlayer1.logs[0].args._to,
            player,
            'owner of token must be player 1',
        );
        assert.equal(
            claimTokenResultPlayer2.logs[0].args._to,
            player2,
            'owner of token must be player 2',
        );

        const token1 = await artifaqt.getToken.call(claimTokenResultPlayer1.logs[0].args._tokenId);
        const token2 = await artifaqt.getToken.call(claimTokenResultPlayer2.logs[0].args._tokenId);

        // Token id
        assert.equal(token1[0].toNumber(), claimTokenResultPlayer1.logs[0].args._tokenId);
        assert.equal(token2[0].toNumber(), claimTokenResultPlayer2.logs[0].args._tokenId);

        // Token owner
        assert.equal(token1[1], player);
        assert.equal(token2[1], player2);

        // Token type
        assert.equal(token1[2].toNumber(), 0);
        assert.equal(token2[2].toNumber(), 1);
    });

    it('claim token: a player cannot claim the same token type multiple types', async () => {
        const sinIndex = 0;

        const balance = (await artifaqt.balanceOf.call(player)).toNumber();

        // Player claims one token of first type
        await artifaqt.claimToken(
            createClaimTokenPayload(sins[sinIndex], player),
            { from: player },
        );

        // Player has its balance increased by 1
        assert.strictEqual(
            (await artifaqt.balanceOf.call(player)).toNumber(),
            balance + 1,
            'player has an additional token',
        );

        // Player should fail claiming the same token type
        assertRevert(artifaqt.claimToken(
            createClaimTokenPayload(sins[sinIndex], player),
            { from: player },
        ));

        // Player has the same balance
        assert.strictEqual(
            (await artifaqt.balanceOf.call(player)).toNumber(),
            balance + 1,
            'player did not claim an additional token',
        );
    });

    it("claim token: return the player's claimed types of token", async () => {
        // Player claims some tokens
        const claimTokens = [6, 5, 8, 0];
        for (let i = 0; i < claimTokens.length; i += 1) {
            // Token type
            const sin = claimTokens[i];

            // Claim token
            await artifaqt.claimToken(
                createClaimTokenPayload(sins[sin], player),
                { from: player },
            );
        }

        // Player must have these tokens claimed
        const playerTokens = await artifaqt.getTokenTypes.call(player);

        // Check if the claimed tokens match
        for (let i = 0; i < claimTokens.length; i += 1) {
            assert.equal(
                claimTokens[i],
                playerTokens[i].toNumber(),
                'token type does not match',
            );
        }
        assert.equal(
            claimTokens.length,
            playerTokens.length,
            'claimed tokens length mismatch player tokens length',
        );
    });

    it('admin: mint token for player', async () => {
        // Initial player token count
        const playerTokens = (await artifaqt.balanceOf.call(player)).toNumber();

        // Mint token 1 for player
        const token1 = await artifaqt.mintToken(
            player,
            0,
            { from: owner },
        );

        // Mint token 2 for player
        const token2 = await artifaqt.mintToken(
            player,
            1,
            { from: owner },
        );

        // Player should have 2 more tokens
        assert.equal(
            playerTokens + 2,
            (await artifaqt.balanceOf.call(player)).toNumber(),
            'admin shound mint 2 more tokens for player',
        );

        // Get token data
        const token1Data = await artifaqt.getToken.call(token1.logs[0].args._tokenId.toNumber());
        const token2Data = await artifaqt.getToken.call(token2.logs[0].args._tokenId.toNumber());

        // Check token 1
        assert.equal(
            token1Data[0].toNumber(),
            token1.logs[0].args._tokenId.toNumber(),
            'token 1 id not as expected',
        );
        assert.equal(token1Data[1], player, 'token 1 owner does not match player');
        assert.equal(token1Data[2], 0, 'token 1 type not as expected');

        // Check token 2
        assert.equal(
            token2Data[0].toNumber(),
            token2.logs[0].args._tokenId.toNumber(),
            'token 2 id not as expected',
        );
        assert.equal(token2Data[1], player, 'token 2 owner does not match player');
        assert.equal(token2Data[2], 1, 'token 2 type not as expected');
    });
});

const { sins } = require('./config');
const { displayGasStats } = require('../helpers/gasCosts');
const { createClaimTokenPayload } = require('../helpers/artifaqt');

const ArtifaqtContract = artifacts.require('Artifaqt');

// Account that deploys the contract
let owner;

// Artifaqt contract instance
let artifaqt;

contract('Artifaqt', async (accounts) => {
    beforeEach(async () => {
        owner = accounts[0];
        artifaqt = await ArtifaqtContract.new({ from: owner });
    });

    it('gas cost: deploy contact', async () => {
        artifaqt = await ArtifaqtContract.new({ from: owner });

        const receipt = await web3.eth.getTransactionReceipt(artifaqt.transactionHash);

        console.log(`deploy: ${receipt.gasUsed}`);
    });

    it('gas cost: claim all tokens for random players 30 times', async () => {
        const claimCosts = [];

        // Claim all tokens with each available account
        for (let testIndex = 0; testIndex < accounts.length; testIndex += 1) {
            const randomPlayer = accounts[testIndex];

            for (let sinIndex = 0; sinIndex < sins.length; sinIndex += 1) {
                // Claim token
                const tx = await artifaqt.claimToken(
                    createClaimTokenPayload(sins[sinIndex], randomPlayer),
                    sinIndex,
                    { from: randomPlayer },
                );

                // Add gasUsed
                claimCosts.push(tx.receipt.gasUsed);
            }
        }

        // Make sure actions were done
        assert.isNotEmpty(claimCosts);

        // Display stats
        displayGasStats(claimCosts);
    });
});

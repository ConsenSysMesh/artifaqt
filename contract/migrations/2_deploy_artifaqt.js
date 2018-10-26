const Artifaqt = artifacts.require('./Artifaqt.sol');
const MockArtifaqtTime = artifacts.require('./MockArtifaqtTime.sol');

module.exports = (deployer) => {
    deployer.deploy(Artifaqt);
    deployer.deploy(MockArtifaqtTime);
};

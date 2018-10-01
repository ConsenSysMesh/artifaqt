const Artifaqt = artifacts.require("./Artifaqt.sol");

module.exports = (deployer, network, accounts) => {
    console.log("[Network]", network);

    deployer.deploy(Artifaqt);
}
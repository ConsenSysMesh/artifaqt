pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/artifaqt/Artifaqt.sol";

contract TestArtifaqt {
    function testTrue() public {
        Artifaqt atq = new Artifaqt();

        string memory hashString = atq.hashToString(0xf221c4967b224a60225f887eeeeb30bc20abd0d5aeba78ea121b5b4ec4260ad7);

        Assert.equal(
            hashString, 
            "0xf221c4967b224a60225f887eeeeb30bc20abd0d5aeba78ea121b5b4ec4260ad7", 
            "hashToString should transform bytes32 to the hex representation"
        );
    }
}
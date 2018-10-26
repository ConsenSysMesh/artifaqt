pragma solidity 0.4.24;

import "./Artifaqt.sol";

contract MockArtifaqtTime is Artifaqt {
    function travelBackInTime(uint256 secs) external {
        cutoffMintingTime -= secs;
    }
}
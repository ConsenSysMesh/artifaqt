pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address owner;

    constructor() public {
        //
        owner = msg.sender;

        // 
        name = "Artifaqt";
        symbol = "ATQ";
    }

    // TODO: remove this function, only testing basic stuff now
    function mintForMyself() public {
        addToken(msg.sender, totalSupply());
    }

    function recoverAddr(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        return ecrecover(msgHash, v, r, s);
    }
    
    function isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (bool) {
        return ecrecover(msgHash, v, r, s) == _addr;
    }

    // TODO: add hashed messages to be checked
    function signedBy(address _addr, bytes32 msg, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (bool) {
        require(keccak256(msg) == msgHash);
        require(keccak256("Those who were never baptised") == msgHash);

        return isSigned(_addr, msgHash, v, r, s);
    }
}
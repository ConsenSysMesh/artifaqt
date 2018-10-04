pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address public owner;

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

    function recoverAddr(bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        return ecrecover(_msgHash, _v, _r, _s);
    }
    
    function isSigned(address _addr, bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (bool) {
        return ecrecover(_msgHash, _v, _r, _s) == _addr;
    }

    // function claimToken(bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s, bytes32 _sin) public returns (bool, bytes32, bytes32) {
    //     bytes32 lust = 0x48cc1577207f7c557e79b55cdb60d4c8c8320e399028f423013c1a787021e3ae;

    //     require(msg.sender == ecrecover(_msgHash, _v, _r, _s));

    //     if (_sin == keccak256(abi.encodePacked(lust))) {
    //         addToken(msg.sender, totalSupply());

    //         return (true, _sin, keccak256(abi.encodePacked(lust)));
    //     }

    //     return (false, _sin, keccak256(abi.encodePacked(lust)));
    // }

    // TODO: add hashed messages to be checked
    // function signedBy(address _addr, bytes32 msg, bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (bool) {
    //     require(keccak256(msg) == _msgHash);
    //     require(keccak256("Those who were never baptised") == _msgHash);

    //     return isSigned(_addr, _msgHash, _v, _r, _s);
    // }
}
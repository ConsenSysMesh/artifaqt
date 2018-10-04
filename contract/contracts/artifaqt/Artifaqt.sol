pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address public owner;

    constructor() public {
        // Set owner / admin
        owner = msg.sender;

        // Default name and symbol
        name = "Artifaqt";
        symbol = "ATQ";
    }

    function recoverAddr(
        bytes32 _msgHash,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
        ) public pure returns (address)
    {
        return ecrecover(_msgHash, _v, _r, _s);
    }

    function isSigned(
        address _addr,
        bytes32 _msgHash,
        uint8 _v,
        bytes32 _r,
        bytes32 _s) public pure returns (bool)
    {
        return ecrecover(_msgHash, _v, _r, _s) == _addr;
    }

    function claimToken(
        bytes32 _msgHash, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s, 
        bytes32 _sin) public returns (bool, bytes32, bytes32) 
    {
        bytes32 lust = 0xfc3fe4f31dfabb1d4f80738b0c84c940483c755284943811599526cb3d4bd237;

        require(isSigned(msg.sender, _msgHash, _v, _r, _s));
        require(_sin == keccak256(abi.encodePacked(lust, bytes32(msg.sender))));

        addToken(msg.sender, totalSupply());

        emit TokenClaimed(_sin, keccak256(abi.encodePacked(lust)), msg.sender);
    }

    event TokenClaimed(bytes32 sin, bytes32 sinHash, address player);
}
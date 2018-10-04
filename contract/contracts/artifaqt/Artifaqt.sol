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
        bytes32 _signature,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
        ) public pure returns (address)
    {
        return ecrecover(_signature, _v, _r, _s);
    }

    function isSigned(
        address _addr,
        bytes32 _signature,
        uint8 _v,
        bytes32 _r,
        bytes32 _s) public pure returns (bool)
    {
        return ecrecover(_signature, _v, _r, _s) == _addr;
    }

    function claimToken(
        bytes32 _message, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s, 
        bytes32 _sin) public
    {
        bytes32 lust = 0xfc3fe4f31dfabb1d4f80738b0c84c940483c755284943811599526cb3d4bd237;

        // Make sure this message was signed by the sender
        require(isSigned(msg.sender, _message, _v, _r, _s));

        // Make sure lust is the sin
        require(_sin == keccak256(abi.encodePacked(lust, msg.sender)));

        // Make sure the message is 
        require(_message == keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n66", hashToString(_sin))));

        addToken(msg.sender, totalSupply());

        emit TokenClaimed(_sin, keccak256(abi.encodePacked(lust)), msg.sender);
    }

    function hashToString(bytes32 _hash) public pure returns(string) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(66);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < 32; i++) {
            str[2+i*2] = alphabet[uint(_hash[i] >> 4)];
            str[3+i*2] = alphabet[uint(_hash[i] & 0x0f)];
        }
        return string(str);
    }

    event TokenClaimed(bytes32 sin, bytes32 sinHash, address player);
}
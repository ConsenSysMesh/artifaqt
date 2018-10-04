pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address public owner;

    bytes32[] private sins;

    constructor() public {
        // Limbo
        sins.push(keccak256("Those who were never baptised.")); 
        // Lust
        sins.push(keccak256("Those who gave into pleasure.")); 
        // Gluttony
        sins.push(keccak256("Those who indulged in excess.")); 
        // Avarice
        sins.push(keccak256("Those who hoard and spend wastefully.")); 
        // Wrath
        sins.push(keccak256("Those consumed by anger and hatred.")); 
        // Heresy
        sins.push(keccak256("Those who worshipped false idols.")); 
        // Violence
        sins.push(keccak256("Those violent against others, one’s self, and God.")); 
        // Fraud
        sins.push(keccak256("Those who used lies and deception for personal gain.")); 
        // Treachery
        sins.push(keccak256("Those who have betrayed their loved ones.")); 

        // Set owner
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
        bytes32 _sin,
        uint256 _sinIndex) public
    {
        bytes32 sinHash = sins[_sinIndex];

        // Make sure this message was signed by the sender
        require(isSigned(msg.sender, _message, _v, _r, _s));

        // Make sure it's the correct sin
        require(_sin == keccak256(abi.encodePacked(sinHash, msg.sender)));

        // Make sure the message is 
        require(_message == keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n66", hashToString(_sin))));

        addToken(msg.sender, totalSupply());

        emit TokenClaimed(_sin, _sinIndex, keccak256(abi.encodePacked(sinHash)), msg.sender);
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

    event TokenClaimed(bytes32 sin, uint256 sinIndex, bytes32 sinHash, address player);
}
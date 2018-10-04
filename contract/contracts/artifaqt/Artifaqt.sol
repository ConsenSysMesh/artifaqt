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

        addToken(msg.sender, totalSupply());

        emit TokenClaimed(_sin, keccak256(abi.encodePacked(lust)), msg.sender);
    }

    function hashToString(bytes32 _hash) public returns (string) {
        bytes memory bytesArray = new bytes(66);
        bytesArray[0] = byte("0");
        bytesArray[1] = byte("1");

        uint index = 2;
        for (uint256 i; i < 32; i++) {
            byte high = _hash[i] & 0xf0;
            bytesArray[index] = byteToChar(high);
            index++;

            byte low = _hash[i] & 0x0f;
            bytesArray[index] = byteToChar(low);
            index++;
        }

        emit String(string(bytesArray));

        return string(bytesArray);
        return "";
    }

    function byteToChar(byte b) returns (byte) {
        if (b == 0) return byte("0");
        if (b == 1) return byte("1");
        if (b == 2) return byte("2");
        if (b == 3) return byte("3");
        if (b == 4) return byte("4");
        if (b == 5) return byte("5");
        if (b == 6) return byte("6");
        if (b == 7) return byte("7");
        if (b == 8) return byte("8");
        if (b == 9) return byte("9");
        if (b == 10) return byte("a");
        if (b == 11) return byte("b");
        if (b == 12) return byte("c");
        if (b == 13) return byte("d");
        if (b == 14) return byte("e");
        if (b == 15) return byte("f");
    }

    event TokenClaimed(bytes32 sin, bytes32 sinHash, address player);
    event String(string s);
    event Byte(bytes1);
}
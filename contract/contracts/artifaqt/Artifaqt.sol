pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address public owner;

    bytes32[] private sins;

    // TokenURI metadata
    string[9] private tokenURILinks;

    // Mapping from token ID to token type
    mapping(uint256 => uint256) internal typeOfToken;

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

        // Token metadata
        tokenURILinks[0] = "https://googoogaga.surge.sh/json/0.json";
        tokenURILinks[1] = "https://googoogaga.surge.sh/json/1.json";
        tokenURILinks[2] = "https://googoogaga.surge.sh/json/2.json";
        tokenURILinks[3] = "https://googoogaga.surge.sh/json/3.json";
        tokenURILinks[4] = "https://googoogaga.surge.sh/json/4.json";
        tokenURILinks[5] = "https://googoogaga.surge.sh/json/5.json";
        tokenURILinks[6] = "https://googoogaga.surge.sh/json/6.json";
        tokenURILinks[7] = "https://googoogaga.surge.sh/json/7.json";
        tokenURILinks[8] = "https://googoogaga.surge.sh/json/8.json";

        // Set owner
        owner = msg.sender;

        // Default name and symbol
        name = "Artifaqt";
        symbol = "ATQ";
    }

    function claimToken(
        bytes32 _sin,
        uint256 _sinIndex) public
    {
        bytes32 sinHash = sins[_sinIndex];

        // Make sure it's the correct sin
        require(_sin == keccak256(abi.encodePacked(sinHash, msg.sender)));

        uint256 tokenId = totalSupply();
        addToken(msg.sender, tokenId);

        // Save token type
        typeOfToken[tokenId] = _sinIndex;

        // Save tokenURI
        tokenURIs[tokenId] = tokenURILinks[_sinIndex];

        emit TokenClaimed(tokenId, _sinIndex, msg.sender);
    }

    function getToken(
        uint256 _tokenId
    ) public view returns (uint256, address, uint256) {
        return (
            allTokensIndex[_tokenId],
            ownerOfToken[_tokenId],
            typeOfToken[_tokenId]
        );
    }

    /*
    Do i really need this?
    function uint2str(uint i) internal pure returns (string) {
		if (i == 0) return "0";
		uint j = i;
		uint length;
		while (j != 0){
			length++;
			j /= 10;
		}
		bytes memory bstr = new bytes(length);
		uint k = length - 1;
		while (i != 0){
			bstr[k--] = byte(48 + i % 10);
			i /= 10;
		}
		return string(bstr);
	}
    */

    event TokenClaimed(uint256 tokenId, uint256 sinType, address player);
}
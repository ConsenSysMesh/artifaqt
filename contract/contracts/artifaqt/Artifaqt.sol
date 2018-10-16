pragma solidity ^0.4.24;

import "./../eip721/EIP721.sol";


contract Artifaqt is EIP721 {
    address public admin;

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
        admin = msg.sender;

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

        // Make sure the user does not have this type of token
        require(ownerHasTokenType(msg.sender, _sinIndex) == false);

        // Create and add token
        uint256 tokenId = totalSupply();
        addToken(msg.sender, tokenId, _sinIndex, tokenURILinks[_sinIndex]);

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

    function ownerHasTokenType(
        address _owner,
        uint256 _sinIndex
    ) public view returns (bool) {
        for (uint256 i = 0; i < ownedTokens[_owner].length; i++) {
            if (typeOfToken[ownedTokens[_owner][i]] == _sinIndex) {
                return true;
            }
        }
        return false;
    }

    function addToken(
        address _to,
        uint256 _tokenId,
        uint256 _tokenType,
        string _tokenURI
    ) internal {
        super.addToken(_to, _tokenId);

        // Save token type
        typeOfToken[_tokenId] = _tokenType;

        // Save tokenURI
        tokenURIs[_tokenId] = _tokenURI;
    }

    function mintToken(
        address _to, 
        uint256 _sinIndex
    ) public onlyOwner {
        // Create and add token
        uint256 tokenId = totalSupply();
        addToken(_to, tokenId, _sinIndex, tokenURILinks[_sinIndex]);

        emit TokenClaimed(tokenId, _sinIndex, msg.sender);
    }

    event TokenClaimed(uint256 tokenId, uint256 sinType, address player);

    modifier onlyOwner() {
        require(msg.sender == admin);
        _;
    }
}
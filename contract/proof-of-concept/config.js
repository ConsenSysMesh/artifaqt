let QRCodeData = {
    sin: "Those who were never baptised.",
    sinIndex: 0,
};

// Add the contract address here
let contractAddress = '0x73044fCFB6434292d34be4257A7fA79F9cDe388e';

// This is a truncated ABI, we only need these functions for now. More will be added
let contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_sin",
                "type": "bytes32"
            },
            {
                "name": "_sinIndex",
                "type": "uint256"
            }
        ],
        "name": "claimToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
    
let QRCodeData = {
    sin: "Those who were never baptised.",
    sinIndex: 0,
};

// Add the contract address here
let contractAddress = '0x41F3DbFb4ce2672Ca932097476af82Aef74fF694';

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
    
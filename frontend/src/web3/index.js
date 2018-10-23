import Web3 from 'web3';

import { contractAddress } from '../config';
import { abi } from './abis/Artifaqt.json';

export const web3 = new Web3(Web3.givenProvider);
export const Artifaqt = new web3.eth.Contract(abi, contractAddress);

const sins = {
  "Those who were never baptised.": 1,
  "Those who gave into pleasure.": 2,
  "Those who indulged in excess.": 3,
  "Those who hoard and spend wastefully.": 4,
  "Those consumed by anger and hatred.": 5,
  "Those who worshipped false idols.": 6,
  "Those violent against others, one’s self, and God.": 7,
  "Those who used lies and deception for personal gain.": 8,
  "Those who have betrayed their loved ones.": 9,
}

export const keys = Object.keys(sins);

const sinToIndex = sin => sins[sin];

export const claimToken = (sin, address, callback, tokenClaimed, receiptRecieved) => {
  const sinHash = web3.utils.sha3(sin);
  const sinPayloadHash = web3.utils.sha3(sinHash + address.substr(2), { encoding: 'hex' });
  const sinIndex = sinToIndex(sin);

  Artifaqt.methods.claimToken(sinPayloadHash)
    .send({ from: address, gasLimit: 500000, gasPrice: 10**10 })
    .on('transactionHash',  hash => {
      tokenClaimed(sinIndex);
      console.log(`hash = ${hash}`)
    })
    .on('receipt', receipt => {
      console.log(receipt)
      receiptRecieved(sinIndex);
      callback();
    })
    .on('error', () => {
      alert(`Something went wrong.
      You probably already have this token`)
      callback()
    });
}
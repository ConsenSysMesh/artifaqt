import Web3 from 'web3';

import { contractAddress } from '../config';
import { abi } from './abis/Artifaqt.json';

export const web3 = new Web3(Web3.givenProvider);
export const Artifaqt = new web3.eth.Contract(abi, contractAddress);

export const claimToken = (data, address, callback) => {
  const sin = data.sin;
  const sinHash = web3.utils.sha3(sin);
  const sinPayloadHash = web3.utils.sha3(sinHash + address.substr(2), { encoding: 'hex' });
  const sinIndex = data.index;

  console.log(`sinHash = ${sinHash}`);
  console.log(`sinPayloadHash = ${sinPayloadHash}`);

  Artifaqt.methods.claimToken(
    sinPayloadHash,
    sinIndex,
  ).send({ from: address, gasLimit: 500000, gasPrice: 10**10 })
      .on('transactionHash',  hash => console.log(`hash = ${hash}`))
      .on('receipt', receipt => {
        console.log(receipt)
        callback();
      })
      .on('error', () => {
        alert(`Something went wrong. 
        You probably already have this token`)
        callback()
      });
}
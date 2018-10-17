import Web3 from 'web3';

import { contractAddress } from '../config';
import { abi } from './abis/Artifaqt.json';

export const web3 = new Web3(Web3.givenProvider);
export const Artifaqt = new web3.eth.Contract(abi, contractAddress);
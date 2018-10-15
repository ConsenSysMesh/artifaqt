/**
 * Logger
 */
export const activateLogger = true;

/**
 * Contract
 */
// export const contractAddress = '0x3435a6180fbb1baec87bdc49915282bfbc328c70'; //Ganache
export const contractAddress = '0x25bfc3939528218a362918c7974a932a2a9b9537'; //Ropsten

/**
 * Ethereum network
 */
export const requiredNetworkId = '3'; //Ropsten
// export const requiredNetworkId = '42'; //Ganache

/**
 * Token names
 */
export const tokenMetadata = [
  { // 0
    name: 'Limbo',
    sin: 'Those who were never baptised.',
  },
  { // 1
    name: 'Lust',
    sin: 'Those who gave into pleasure.',
  },
  { // 2
    name: 'Gluttony',
    sin: 'Those who indulged in excess.',
  },
  { // 3
    name: 'Avarice',
    sin: 'Those who hoard and spend wastefully.',
  },
  { // 4
    name: 'Wrath',
    sin: 'Those consumed by anger and hatred.',
  },
  { // 5
    name: 'Heresy',
    sin: 'Those who worshipped false idols.',
  },
  { // 6
    name: 'Violence',
    sin: 'Those violent against others, one’s self, and God.',
  },
  { // 7
    name: 'Fraud',
    sin: 'Those who used lies and deception for personal gain.',
  },
];
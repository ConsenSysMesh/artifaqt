const initialState = {
  grid: [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
  ],
  solved: false,
  canInteract: false,
  web3: {},
  tokenIndexes: [],
  user: {
    address: undefined,
    tokens: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
    }
  },
}

export default initialState;

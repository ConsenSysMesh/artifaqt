const initialState = {
  grid: [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
  ],
  solved: false,
  canInteract: false,
  user: {
    address: undefined,
    tokens: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
    }
  }
}

export default initialState;

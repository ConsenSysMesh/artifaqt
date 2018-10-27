const allTokensReducer = (a, b, i) => ((a || i === '1') && b)  === true;

export default allTokensReducer;
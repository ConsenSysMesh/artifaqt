import React from 'react';

import Puzzle from '../containers/Puzzle';
import Dashboard from './Dashboard';

const allTokensReducer = (a, b) => a && b;
const tokensLoadedReducer = (a, b) => a === undefined || b === undefined; 

const Game = ({ tokens, fetchUserTokens }) => {
  const hasAllTokens = tokens.reduce(allTokensReducer);
  const tokensLoading = tokens.reduce(tokensLoadedReducer)
  return (
    tokensLoading ?
    <div></div> :
    hasAllTokens ?
    <Puzzle /> :
    <Dashboard fetchUserTokens={fetchUserTokens} />
  );
};

export default Game;

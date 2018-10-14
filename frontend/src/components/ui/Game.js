import React from 'react';

import Puzzle from '../containers/Puzzle';
import Dashboard from './Dashboard';

const reducer = (a, b) => a && b;

const Game = ({ tokens }) => {
  const hasAllTokens = tokens.reduce(reducer);
  console.log(hasAllTokens);
  return (
    hasAllTokens ?
    <Puzzle /> :
    <Dashboard />
  );
};

export default Game;

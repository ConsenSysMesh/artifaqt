import React, { Component } from 'react';

import Tile from './Tile';

const size = [0,1,2]

class Grid extends Component {
  render() {
    return (
      <div className="grid">
        {size.map((i, index) => size.map((j) => <Tile y={i} x={j} />))}
      </div>
    );
  }
}

export default Grid;

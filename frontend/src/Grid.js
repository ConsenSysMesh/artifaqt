import React, { Component } from 'react';

import Tile from './Tile';

const size = Array.apply(null, Array(9))

class Grid extends Component {
  render() {
    return (
      <div className="grid">
        {size.map((n, i) => <Tile key={i} number={i}/>)}
      </div>
    );
  }
}

export default Grid;

import React, { Component } from 'react';

import Tile from './Tile';

const size = [0,1,2,3,4,5,6,7,8]

class Grid extends Component {
  render() {
    return (
      <div className="grid">
        {size.map((num, i) => <Tile key={i} number={num}/>)}
      </div>
    );
  }
}

export default Grid;

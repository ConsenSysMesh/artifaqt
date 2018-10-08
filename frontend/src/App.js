import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './Grid';
import Tile from './Tile';
import Video from './Video';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Video />
        <div className="grid-container">
          <Grid />
          <button onClick={() => this.props.mixUp()}>Mix</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mixUp: () => dispatch({ type: 'MIX' })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);

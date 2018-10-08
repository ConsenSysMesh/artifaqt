import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './Grid';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid size={3} />
        <div>
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
  mapDispatchToProps,
)(App);

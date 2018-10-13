import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './Grid';
import Video from './Video';

class App extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.mixUp()
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        <Video />
        <div className="grid-container">
          <Grid />
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

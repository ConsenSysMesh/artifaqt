import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '../ui/Grid';
import Video from '../ui/Video';

class Game extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.mixUp()
    }, 3000);
  }

  render() {
    return (
      <div className="game">
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
)(Game);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './Grid';
import Video from './Video';
import Intro from './Intro';

class App extends Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.readyToPlay && this.props.readyToPlay) {
      setTimeout(() => {
        this.props.mixUp()
      }, 2000);
    }
  }

  claimToken() {
    if (window.web3 !== undefined) {
      window.web3.currentProvider
        .scanQRCode()
        .then(data => {
          console.log('QR Scanned:', data)
          this.props.claimToken(data)
        })
        .catch(err => {
          console.log('Error:', err)
        })
    } else {
      this.props.claimToken()
    }
  }

  render() {
    return (
      <div className="App">
        <Intro
          claimToken={() => this.claimToken()}
          readyToPlay={this.props.readyToPlay}
        />
        <Video readyToPlay={this.props.readyToPlay} />
        <div className="grid-container">
          <Grid />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    readyToPlay: state.get('tokenIndexes').size === 8,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mixUp: () => dispatch({ type: 'MIX' }),
    claimToken: () => dispatch({ type: 'ADD_TOKEN' }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

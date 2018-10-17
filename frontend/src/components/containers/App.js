import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '../ui/Grid';
import Video from '../ui/Video';
import Intro from '../ui/Intro';
import { requiredNetworkId } from '../../config';
import { Artifaqt, web3 } from '../../web3';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRopsten: false
    }
    this.fetchUserTokens = this.fetchUserTokens.bind(this);
  }

  componentDidMount() {
    if (window.web3) {
      window.web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case requiredNetworkId:
            this.setState({
              web3Loading: false,
              onRequiredNetwork: true
            });
            this.fetchUserAccounts();
            break
          default:
            this.setState({
              web3Loading: false,
              onRequiredNetwork: false
            });
          }
        });
    } else {
      this.setState({
        web3Loading: false,
        onRequiredNetwork: false
      });
    }
  }

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

  fetchUserAccounts() {
    web3.eth.getAccounts()
      .then(accounts => {
        const address = accounts[0];
        console.log(`address: ${address}`);
        this.props.updateUserAddress(address);
        this.fetchUserTokens(address);
      })
      .catch(err => console.log(err))
  }

  fetchUserTokens(address) {
    const { tokens, updateUserToken } = this.props;
    for (let i=0;i<8;i++) {
      Artifaqt.methods.ownerHasTokenType(address, i).call()
      .then(res => {
        console.log(`token ${i}: ${res}`);
        if (tokens.get(`${i}`) !== res) {
          updateUserToken(i, res);
        }
      })
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
    tokens: state.getIn(['user', 'tokens']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mixUp: () => dispatch({ type: 'MIX' }),
    claimToken: () => dispatch({ type: 'ADD_TOKEN' }),
    updateUserAddress: (address) => dispatch({ type: 'UPDATE_USER_ADDRESS', address }),
    updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

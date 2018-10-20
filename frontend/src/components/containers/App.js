import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '../ui/Grid';
import Video from '../ui/Video';
import Intro from '../ui/Intro';
import { requiredNetworkId } from '../../config';
import { Artifaqt, web3, claimToken } from '../../web3';
import allTokensReducer from '../../utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRopsten: false,
      string: false,
    }
    this.fetchUserTokens = this.fetchUserTokens.bind(this);
    this.fetchUserAccounts = this.fetchUserAccounts.bind(this);
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
        .scanQRCode(/(.+$)/)
        // .scanQRCode()
        .then(data => {
          this.setState({ string: `DATA IS: ${data}` })
          console.log('QR Scanned:', data)
        })
        .catch(err => {
          this.setState({ string: `ERROR: ${err}` })
          console.log('Error:', err)
        })
      // window.web3.currentProvider
      //   .scanQRCode()
      //   // .scanQRCode(/(.+$)/)
      //   .then(data => {
      //     this.setState({ string: `DATA IS: ${data}` })
      //     claimToken(JSON.parse(data), this.props.address, this.fetchUserAccounts)
      //   })
      //   .catch(err => {
      //     this.setState({ string: `ERROR: ${err}` })
      //     console.log('Error:', err)
      //   })
    } else {
      this.setState({ string: 'data' })
      // TODO: remove this!!!!!
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
    for (let i=1;i<9;i++) {
      Artifaqt.methods.ownerHasTokenType(address, i - 1).call()
      .then(res => {
        console.log(`token ${i}: ${res}`);
        if (tokens.get(`${i}`) !== res) {
          updateUserToken(i, res);
        }
      })
    }
  }

  render() {
    const { readyToPlay, displayTileInfo, activeTileInfo, activeNumber, help } = this.props;
    return (
      <div className="App">
        <Intro
          displayTileInfo={displayTileInfo}
          activeTileInfo={activeTileInfo}
          readyToPlay={readyToPlay}
          toggleInfo={() => this.props.toggleInfo()}
          activeNumber={activeNumber}
          help={help}
        />
        <div className="starter-elements-container">
          <div className="how-top-play-container">
            <button onClick={() => this.props.toggleHelp()}>?&#191;?</button>
          </div>
          <h1>artifaqts</h1>
          {this.state.string && <h3 style={{zIndex: 1000, marginTop: '200px'}}>{this.state.string}</h3>}
          <div className="claim-button-container">
            <button onClick={() => this.claimToken()}>scan qr code</button>
          </div>
        </div>
        <Video readyToPlay={readyToPlay} />
        <div className="grid-container">
          <Grid />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readyToPlay: state.getIn(['user', 'tokens']).reduce(allTokensReducer),
  address: state.getIn(['user', 'address']),
  tokens: state.getIn(['user', 'tokens']),
  displayTileInfo: state.getIn(['tokenInformation', 'open']),
  displayHelp: state.getIn(['tokenInformation', 'open']),
  activeTileInfo: state.getIn(['tokenInformation', state.getIn(['tokenInformation', 'activeNumber']).toString()]),
  activeNumber: state.getIn(['tokenInformation', 'activeNumber']),
  help: state.getIn(['tokenInformation', 'help']),
});

const mapDispatchToProps = (dispatch) => ({
    mixUp: () => dispatch({ type: 'MIX' }),
    updateUserAddress: (address) => dispatch({ type: 'UPDATE_USER_ADDRESS', address }),
    updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
    toggleHelp: () => dispatch({ type: 'TOGGLE_HELP' }),
    toggleInfo: () => dispatch({ type: 'TOGGLE_INFO' }),
    claimToken: () => dispatch({ type: 'ADD_TOKEN' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

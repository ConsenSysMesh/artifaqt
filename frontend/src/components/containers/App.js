import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '../ui/Grid';
import Video from '../ui/Video';
import Info from '../ui/Info';
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
      }, 1000);
    }
  }

  claimToken() {
    const { address, tokenClaimed, receiptRecieved } = this.props;
    if (window.web3 !== undefined) {
      window.web3.currentProvider
        .scanQRCode(/(.+$)/)
        .then(data => {
          this.setState({ string: `DATA IS: ${data}` })
          console.log('QR Scanned:', data)
          claimToken(data, address, this.fetchUserAccounts, tokenClaimed, receiptRecieved)
        })
        .catch(err => {
          this.setState({ string: `ERROR: ${err}` })
          console.log('Error:', err)
        })
    }
    // else {
    //   // // TODO: remove this!!!!!
    //   // start += 1;
    //   // this.props.claimToken(start)
    //   // setTimeout(() => {
    //   //   this.props.addToken(start)
    //   // }, 3000)
    // }
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
        // changed this to only set token to true if tx has been mined
        // allows for 'claimed' tokens which have recieved a receipt
        if (res && (tokens.get(`${i}`) !== res)) updateUserToken(i, res);
        console.log(`token ${i}: ${res}`);
      })
    }
  }

  render() {
    const { readyToPlay, displayTileInfo, activeTileInfo, activeNumber, help, solved } = this.props;
    return (
      <div className="App">
        {this.state.string && <h3 style={{zIndex: 1000, marginTop: '200px'}}>{this.state.string}</h3>}
        <Info
          displayTileInfo={displayTileInfo}
          activeTileInfo={activeTileInfo}
          closeOverlay={() => this.props.closeOverlay()}
          activeNumber={activeNumber}
          help={help}
        />
        <Video readyToPlay={readyToPlay && !solved} />
        <div className="grid-container">
          <div className="how-top-play-container">
            <button onClick={() => this.props.openHelp()}>?&#191;?</button>
          </div>
          <Grid />
          <h1 className={readyToPlay ? 'animate-out': ''}>artifaqts</h1>
          <div className={`claim-button-container ${readyToPlay ? 'animate-out': ''}`}>
            <button onClick={() => this.claimToken()}>scan qr code</button>
          </div>
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
  solved: state.get('solved'),
});

const mapDispatchToProps = (dispatch) => ({
    mixUp: () => dispatch({ type: 'MIX' }),
    updateUserAddress: (address) => dispatch({ type: 'UPDATE_USER_ADDRESS', address }),
    updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
    openHelp: () => dispatch({ type: 'OPEN_HELP' }),
    closeOverlay: () => dispatch({ type: 'CLOSE_OVERLAY' }),
    tokenClaimed: index => dispatch({ type: 'TOKEN_CLAIMED', index }),
    receiptRecieved: index => dispatch({ type: 'ON_RECEIPT', index }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

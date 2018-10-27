import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '../ui/Grid';
import Video from '../ui/Video';
import Info from '../ui/Info';
import Network from '../ui/Network';
import { requiredNetworkId } from '../../config';
import { Artifaqt, web3, claimToken, keys } from '../../web3';
import allTokensReducer from '../../utils';


// let start = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRequiredNetwork: true, // hack - if set to false status launches the flames video
      mobileBrowser: false,
    }
    this.fetchUserTokens = this.fetchUserTokens.bind(this);
    this.fetchUserAccounts = this.fetchUserAccounts.bind(this);
  }

  componentDidMount() {
    if (window.web3) {
      if (window.web3.currentProvider && window.web3.currentProvider.scanQRCode) {
        this.setState({
          mobileBrowser: true,
        });
      }
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
        onRequiredNetwork: false,
        mobileBrowser: false,
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
    const { address, balance, tokenClaimed, receiptRecieved } = this.props;
    if (window.web3 !== undefined) {
      if (this.state.mobileBrowser) {
        if (balance > 0) {
          window.web3.currentProvider
          .scanQRCode(/(.+$)/)
          .then(data => {
            // console.log('QR Scanned:', data)
            setTimeout(() => {
              claimToken(data, address, this.fetchUserAccounts, tokenClaimed, receiptRecieved);
            }, 1000)
          })
          .catch(err => {
            console.log('Error:', err)
          })
        } else {
          alert(`You don't own any ETH - NO PAY, NO PLAY`);
        }
      } else {
        alert(`Apparently you are not using an Ethereum mobile browser.
        Please use Cipher or Status.`);
        // console.log('sin:', keys[start]);
        // claimToken(keys[start], address, this.fetchUserAccounts, tokenClaimed, receiptRecieved)
        // start += 1;

      }
    }
  }

  fetchUserAccounts() {
    web3.eth.getAccounts()
      .then(accounts => {
        const address = accounts[0];
        console.log(`address: ${address}`);
        this.props.updateUserAddress(address);
        this.fetchUserTokens(address);
        this.fetchUserBalance();
      })
      .catch(err => console.log(err))
  }

  fetchUserBalance() {
    web3.eth.getBalance(this.props.address)
      .then(balance => {
        console.log(`balance: ${balance}`);
        this.props.updateUserBalance(web3.utils.fromWei(balance, 'ether'));
      })
      .catch(err => console.log(err))
  }

  fetchUserTokens(address) {
    const { updateUserToken } = this.props;
    Artifaqt.methods.getTokenTypes(address).call()
    .then(res => {
      res.forEach(tokenIndex => updateUserToken(parseInt(tokenIndex) + 1, true))
    })
  }

  render() {
    const { readyToPlay, displayTileInfo, activeTileInfo, activeNumber, help, solved } = this.props;
    const { onRequiredNetwork, web3Loading } = this.state;
    return (
      !onRequiredNetwork ? <Network loading={web3Loading}/> : (
      <div className="App">
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
          <Grid solved={solved} />
          <h1 className={readyToPlay ? 'animate-out': ''}>artifaqts</h1>
          <div className={`claim-button-container ${readyToPlay ? 'animate-out': ''}`}>
            <button onClick={() => this.claimToken()}>scan qr code</button>
          </div>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  readyToPlay: state.getIn(['user', 'tokens']).reduce(allTokensReducer),
  address: state.getIn(['user', 'address']),
  balance: state.getIn(['user', 'balance']),
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
    updateUserBalance: (balance) => dispatch({ type: 'UPDATE_USER_BALANCE', balance }),
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

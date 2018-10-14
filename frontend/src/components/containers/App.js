import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requiredNetworkId } from '../../config';
import Game from '../ui/Game';
import { Artifaqt, web3 } from '../../web3';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRopsten: false
    }
  }

  fetchUserAccounts() {
    web3.eth.getAccounts()
      .then(accounts => {
        const address = accounts[0];
        console.log(address);
        this.props.updateUserAddress(address);
        this.fetchUserTokens(address);
      })
      .catch(err => console.log(err))
  }

  fetchUserTokens(address) {
    const { tokens } = this.props;
    for (let i=0;i<8;i++) {
      Artifaqt.methods.ownerHasTokenType(address, i).call()
      .then(res => {
        console.log(`token ${i}: ${res}`);
        if (tokens.get(`${i}`) !== res) {
          this.props.updateUserToken(i, res);
        }
      })
    }
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

  render() {
    const { web3Loading, onRequiredNetwork } = this.state;
    if (web3Loading) {return null}
    else {
      return (
        onRequiredNetwork ?
        <Game tokens={this.props.tokens}/> :
        <div className='not-connected-container'>
          <p className='not-connected-message'>
            Welcome darq passenger. It seems you are not using an
            appropriate Ethereum browser (check Cipher or 
            Metamask extension if needed), and make sure you 
            are qonnected to the MainNet.
          </p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  tokens: state.getIn(['user', 'tokens']),
});

const mapDispatchToProps = dispatch => ({
  updateUserAddress: (address) => dispatch({ type: 'UPDATE_USER_ADDRESS', address }),
  updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

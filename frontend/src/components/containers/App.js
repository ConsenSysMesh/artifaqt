import React, { Component } from 'react';

import { requiredNetworkId } from '../../config';
import Game from './Game';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRopsten: false
    }
  }

  componentDidMount () {
      if (window.web3) {
        window.web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case requiredNetworkId:
              this.setState({
                web3Loading: false,
                onRequiredNetwork: true
              });
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

  render () {
    const { web3Loading, onRequiredNetwork } = this.state;
    if (web3Loading) {return null}
    else {
      return (
        onRequiredNetwork ?
        <Game /> :
        <p className='not-connected-visitors'>
          Welcome darq passenger. It seems you are not using an
          appropriate Ethereum browser (check Cipher or 
          Metamask extension if needed), and make sure you 
          are qonnected to the MainNet.
        </p>
      )
    }
  }
}

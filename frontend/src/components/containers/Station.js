import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tokenMetadata } from '../../config';
import { Artifaqt, web3 } from '../../web3';

class Station extends Component {

  claimToken(number) {
    const { address, fetchUserTokens } = this.props;
    const sin = tokenMetadata[number]['sin'];
    const sinHash = web3.utils.sha3(sin);
    const sinPayloadHash = web3.utils.sha3(sinHash + address.substr(2), { encoding: 'hex' });
    const sinIndex = number;

    console.log(`sinHash = ${sinHash}`);
    console.log(`sinPayloadHash = ${sinPayloadHash}`);

    Artifaqt.methods.claimToken(
      sinPayloadHash,
      sinIndex,
    ).send({ from: address })
        .on('transactionHash', function (hash) { 
            console.log(`hash = ${hash}`);
        }).on('confirmation', function (confirmationNumber) { // would prefer on receipt but it's a bit buggy on ganache...
            console.log(`confirmationNumber = ${confirmationNumber}`);
            fetchUserTokens(address);
        }).on('error', console.error);
  }

  render() {
    const { number, tokens } = this.props;
    return (
      <div className="token">
        <div className={`station-tile tile-${number + 1}`}></div>
        <div className="station-action">
          <h1>{`Token ${number + 1}: ${tokenMetadata[number]['name']}`}</h1>
          <button 
            type="button" 
            className="claim-button"
            style={{display: tokens.get(`${number}`) ? "none" : "inline"}}
            onClick={() => this.claimToken(number)}
          >
            Claim Token
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  address: state.getIn(['user', 'address']),
  tokens: state.getIn(['user', 'tokens']),
});

const mapDispatchToProps = dispatch => ({
  updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tokenMetadata } from '../../config';

class Station extends Component {

  render() {
    const { number } = this.props;
    return (
      <div className="token">
        <div className={`station-tile tile-${number + 1}`}></div>
        <div className="station-action">
          <h1>{`Token ${number + 1}: ${tokenMetadata[number]['name']}`}</h1>
          <button 
            type="button" 
            className="claim-button"
            onClick={() => console.log('clicking!')}
          >
            Claim Token
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUserToken: (index, value) => dispatch({ type: 'UPDATE_USER_TOKEN', index, value }),
});

export default connect(
  null,
  mapDispatchToProps
)(Station);

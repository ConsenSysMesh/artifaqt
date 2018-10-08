import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tile extends Component {
  render() {
    const { x, y, tileNumber } = this.props;
    const empty = !tileNumber ? 'empty' : '';
    const top = `${y * 100}px`;
    const left = `${x * 100}px`;
    return (
      <div
        className={`tile tile-${tileNumber} ${empty}`}
        onClick={() => this.props.attemptMove(y, x)}
        style={{ top, left }}
      >
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tileNumber: state.getIn(['grid', ownProps.y, ownProps.x]),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attemptMove: (y, x) => dispatch({ type: 'ATTEMPT_MOVE', y, x })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tile);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tile extends Component {
  render() {
    const { x, y, number } = this.props;
    const empty = !number ? 'empty' : '';
    const position = ``;
    const top = `${y * 100}px`;
    const left = `${x * 100}px`;
    return (
      <div
        className={`tile tile-${number} ${empty} ${position}`}
        onClick={() => this.props.attemptMove(y, x)}
        style={{ top, left }}
      >
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return findXY(ownProps.number, state);
}

const findXY = (num, state) => {
  let x, y;
  state.get('grid').map((list, i) => {
    const index = list.indexOf(num)
    if (index > -1) {
      x = index;
      y = i;
    }
  })
  return { x, y };
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

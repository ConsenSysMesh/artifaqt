import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tile extends Component {

  moveTile(y, x) {
    if(this.props.canInteract) this.props.attemptMove(y, x);
  }

  render() {
    const { x, y, number } = this.props;
    const empty = !number ? 'empty' : '';
    const position = ``;
    const top = `${y * 100}px`;
    const left = `${x * 100}px`;
    return (
      <div
        className={`tile tile-${number} ${empty} ${position}`}
        onClick={() => this.moveTile(y, x)}
        style={{ top, left }}
      >
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let x, y;
  state.get('grid').map((list, i) => {
    const index = list.indexOf(ownProps.number)
    if (index > -1) {
      x = index;
      y = i;
    }
  })
  return {
    x,
    y,
    canInteract: state.get('canInteract')
  };
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

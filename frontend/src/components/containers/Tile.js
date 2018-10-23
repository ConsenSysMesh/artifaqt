import React, { Component } from 'react';
import { connect } from 'react-redux';

import allTokensReducer from '../../utils';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { initalAnimate: true };
  }


  componentDidUpdate(prevProps) {
    if (!prevProps.readyToPlay && this.props.readyToPlay) {
      setTimeout(() => {
        this.setState({ initalAnimate: false })
      }, 3000)
    }
  }

  moveTile(y, x) {
    if (this.props.canInteract && !this.props.solved) this.props.attemptMove(y, x);
    else if (!this.props.solved) this.props.displayInfo(this.props.number);
  }

  render() {
    const { x, y, number, hasToken, readyToPlay, solved, claimedToken } = this.props;
    const top = `${y * 100}px`;
    const left = `${x * 100}px`;
    const isVisible = hasToken ? '' : 'not-visible';
    const isPulsing = claimedToken ? 'pulsing' : '';
    const displayPlaceholder = readyToPlay ? '' : 'display-placeholder';
    const initalAnimate = !this.state.initalAnimate ? '' : 'initial-animate';
    const solvedClass = solved ? 'solved' : '';
    return (
      <div
        className={`tile tile-${number} ${isVisible} ${displayPlaceholder} ${initalAnimate} ${solvedClass} ${isPulsing}`}
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
    canInteract: state.get('canInteract'),
    claimedToken: state.getIn(['user', 'tokens', `${ownProps.number}`]) === 'claimed',
    hasToken: state.getIn(['user', 'tokens', `${ownProps.number}`]) !== false,
    readyToPlay: state.getIn(['user', 'tokens']).reduce(allTokensReducer),
    solved: state.get('solved'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptMove: (y, x) => dispatch({ type: 'ATTEMPT_MOVE', y, x }),
    displayInfo: number => dispatch({ type: 'DISPLAY_INFO', number }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tile);

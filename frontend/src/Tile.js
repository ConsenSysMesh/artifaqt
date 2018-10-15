import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    if (this.props.canInteract) this.props.attemptMove(y, x);
  }

  render() {
    const { x, y, number, hasToken, readyToPlay } = this.props;
    const top = `${y * 100}px`;
    const left = `${x * 100}px`;
    const isVisible = hasToken ? '' : 'not-visible';
    const displayPlaceholder = readyToPlay ? '' : 'display-placeholder';
    const initalAnimate = !this.state.initalAnimate ? '' : 'initial-animate';
    return (
      <div
        className={`tile tile-${number} ${isVisible} ${displayPlaceholder} ${initalAnimate}`}
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
    hasToken: state.get('tokenIndexes').indexOf(ownProps.number) > -1,
    readyToPlay: state.get('tokenIndexes').size === 8,
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

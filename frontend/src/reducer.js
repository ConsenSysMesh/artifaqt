import { fromJS } from 'immutable';

import initialState from './initialState';

const MIN = 0;
const MAX = 3 - 1;

const reducer = (state = fromJS(initialState), action) => {
  switch(action.type) {
    case 'ATTEMPT_MOVE':
      const cords = coodrinatesToSwitch(action.y, action.x, state.get('grid'));
      const cord = cords.length ? cordWithZero(cords, state.get('grid')) : false;

      if (cord) {
        const [y, x] = cord.split(',');
        // could be replaced by tileNumber if passed in to action
        const numToSwitch = state.getIn(['grid', action.y, action.x]);
        return state.setIn(['grid', y, x], numToSwitch)
                    .setIn(['grid', action.y, action.x], 0);
        return state;
      }

      return state;
    case 'MIX':
      return mixGrid(state);
    default :
      return state;
  }
}

export default reducer;



const coodrinatesToSwitch = (y, x, grid) => {
  const offsets = [-1, 1];
  let cordsToCheck = []
  offsets.map(off => {
    // check same y first
    if (shouldInclude(x, off) && shouldInclude(y, 0)) {
      cordsToCheck.push(`${y},${x + off}`)
    }
    // check same x first
    if (shouldInclude(y, off) && shouldInclude(x, 0)) {
      cordsToCheck.push(`${y + off},${x}`)
    }
  });

  return cordsToCheck;
}

// checks if index is valid
const shouldInclude = (num, offset) => {
  const total = num + offset;
  return (total >= MIN && total <= MAX)
}

// reutrns either the index that 0 is at or a falsy value
const cordWithZero = (cordsArray, grid) => {
  return cordsArray.reduce((a,b) => {
    if (a.length) return a;
    else {
      const [y, x] = b.split(',');
      if (grid.getIn([y, x]) === 0) return b;
      return a;
    }
  }, '');
}

const mixGrid = state => {
  let currentZeroY = 1, currentZeroX = 1;
  // switch things 200 times based on location of 0
  // always assumes 0 is at 1,1 - line 68
  for (let i = 0; i < 200; i++) {
    // finds possible switches
    const possibleSwitches = coodrinatesToSwitch(currentZeroY, currentZeroX, state.get('grid'));
    // selects a random one
    const indexSwitch = Math.floor(Math.random() * possibleSwitches.length)
    let [switchY, switchX] = possibleSwitches[indexSwitch].split(',');
    const numToSwitch = state.getIn(['grid', switchY, switchX]);
    // switches numbers
    state = state.setIn(['grid', currentZeroY, currentZeroX], numToSwitch)
                 .setIn(['grid', switchY, switchX], 0);

    currentZeroY = parseInt(switchY);
    currentZeroX = parseInt(switchX);
  }

  return state;
}

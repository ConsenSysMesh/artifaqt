import Immutable, { fromJS } from 'immutable';

import initialState from './initialState';

const MIN = 0;
const MAX = 3 - 1;

const reducer = (state = fromJS(initialState), action) => {
  switch(action.type) {
    case 'ATTEMPT_MOVE':
      const cords = coodrinatesToSwitch(action.y, action.x);
      const cord = cords.length ? cordWithZero(cords, state.get('grid')) : false;

      if (cord) {
        const [y, x] = cord.split(',');
        // could be replaced by tileNumber if passed in to action
        const numToSwitch = state.getIn(['grid', action.y, action.x]);
        state = state.setIn(['grid', y, x], numToSwitch)
                    .setIn(['grid', action.y, action.x], 0);
        return state.update('solved', () => {
                      if (Immutable.is(state.get('grid'), fromJS(initialState.grid))) return true;
                      return false;
                    });
      }

      return state;
    case 'MIX':
      return mixGrid(state);
    case 'UPDATE_USER_ADDRESS':
      return state.setIn(['user', 'address'], action.address);
    case 'UPDATE_USER_TOKEN':
      return state.setIn(['user', 'tokens', `${action.index}`], action.value);
    default :
      return state;
  }
}

export default reducer;



const coodrinatesToSwitch = (y, x, prevY = null, prevX = null) => {
  const offsets = [-1, 1];
  let cordsToCheck = []
    // console.log(`check switch: ${prevY},${prevX}` )
  offsets.map(off => {
    // check same y first
    if ((shouldInclude(x, off) && shouldInclude(y, 0))
      && !(y === prevY && (x + off) === prevX)
    ) {
      cordsToCheck.push(`${y},${x + off}`)
    }
    // check same x first
    if ((shouldInclude(y, off) && shouldInclude(x, 0))
      && !(x === prevX && (y + off) === prevY)
    ) {
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

let lastY = null;
let lastX = null;
const mixGrid = state => {
  let currentZeroY = 1, currentZeroX = 1;
  // switch things 200 times based on location of 0
  // always assumes 0 is at 1,1 - line 68
  for (let i = 0; i < 100; i++) {
    // finds possible switches and makes sure it never reverses previous switch
    const possibleSwitches = coodrinatesToSwitch(currentZeroY, currentZeroX, lastY, lastX);
    // selects a random one
    const indexSwitch = Math.floor(Math.random() * possibleSwitches.length)
    let [switchY, switchX] = possibleSwitches[indexSwitch].split(',');
    const numToSwitch = state.getIn(['grid', switchY, switchX]);
    // switches numbers
    state = state.setIn(['grid', currentZeroY, currentZeroX], numToSwitch)
                 .setIn(['grid', switchY, switchX], 0);

    lastY = parseInt(currentZeroY);
    lastX = parseInt(currentZeroX);

    currentZeroY = parseInt(switchY);
    currentZeroX = parseInt(switchX);
  }

  return state.set('canInteract', true);
}

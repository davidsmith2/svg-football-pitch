import {uniqWith, isEqual} from 'lodash';

const initialState = [];

export default function markers(state = initialState, action) {
  switch (action.type) {
    case 'SET_MARKER':
      const nextState = state.slice();
      nextState.push(action.marker);
      return uniqWith(nextState, isEqual);
    default:
      return state;
  }
}

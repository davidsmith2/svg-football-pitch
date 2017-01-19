import {uniq} from 'lodash';

const activeMarker = {
  scaled: [-2, -2],
  unscaled: [-1, -1]
};

const initialState = {
  activeMarker: activeMarker,
  allMarkers: [activeMarker]
};

export default function marker(state = initialState, action) {
  switch (action.type) {
    case 'SET_MARKER':
      console.log(`calling reducer: ${action.type}`);
      return Object.assign({}, state, {
        activeMarker: action.marker,
        allMarkers: uniq(state.allMarkers.concat(action.marker))
      });
    default:
      console.log(`calling reducer: default`);
      return state;
  }
}

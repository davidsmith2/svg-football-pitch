import {uniq} from 'lodash';

const initialState = {
  activeMarker: null,
  allMarkers: []
};

export default function marker(state = initialState, action) {
  switch (action.type) {
    case 'SET_MARKER':
      state.allMarkers.push(action.marker);
      return Object.assign({}, state, {
        activeMarker: action.marker,
        allMarkers: uniq(state.allMarkers)
      });
    default:
      return state;
  }
}

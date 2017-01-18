import {combineReducers} from 'redux';

import pitch from './pitchReducer';
import marker from './markerReducer';

export default combineReducers({
  pitch,
  marker
});

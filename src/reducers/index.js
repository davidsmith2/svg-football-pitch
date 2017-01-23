import {combineReducers} from 'redux';

import pitch from './pitchReducer';
import marker from './markerReducer';
import tabs from './tabsReducer';

export default combineReducers({
  pitch,
  marker,
  tabs
});

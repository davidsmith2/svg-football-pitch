import {combineReducers} from 'redux';

import pitch from './pitchReducer';
import markers from './markersReducer';
import tabs from './tabsReducer';

export default combineReducers({
  pitch,
  markers,
  tabs
});

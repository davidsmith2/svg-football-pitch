const SET_ORIENTATION = 'SET_ORIENTATION';
const SET_WIDTH = 'SET_WIDTH';
const SET_LENGTH = 'SET_LENGTH';
const SET_SCALE_FACTOR = 'SET_SCALE_FACTOR';
const SET_MARKER = 'SET_MARKER';
const SET_TAB = 'SET_TAB';

/**
 * Action creators
 */

export const setOrientation = (orientation) => {
  return {
    type: SET_ORIENTATION,
    orientation
  };
};

export const setWidth = (width) => {
  return {
    type: SET_WIDTH,
    width
  };
};

export const setLength = (length) => {
  return {
    type: SET_LENGTH,
    length
  };
};

export const setScaleFactor = (scaleFactor) => {
  return {
    type: SET_SCALE_FACTOR,
    scaleFactor
  };
};

export const setMarker = (marker) => {
  return {
    type: SET_MARKER,
    marker
  };
};

export const setTab = (key) => {
  return {
    type: SET_TAB,
    key
  };
};
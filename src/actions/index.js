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
  console.log(`calling action creator: ${SET_ORIENTATION}`);
  return {
    type: SET_ORIENTATION,
    orientation
  };
};

export const setWidth = (width) => {
  console.log(`calling action creator: ${SET_WIDTH}`);
  return {
    type: SET_WIDTH,
    width
  };
};

export const setLength = (length) => {
  console.log(`calling action creator: ${SET_LENGTH}`);
  return {
    type: SET_LENGTH,
    length
  };
};

export const setScaleFactor = (scaleFactor) => {
  console.log(`calling action creator: ${SET_SCALE_FACTOR}`);
  return {
    type: SET_SCALE_FACTOR,
    scaleFactor
  };
};

export const setMarker = (marker) => {
  console.log(`calling action creator: ${SET_MARKER}`);
  return {
    type: SET_MARKER,
    marker
  };
};

export const setTab = (key) => {
  console.log(`calling action creator: ${SET_TAB}`);
  return {
    type: SET_TAB,
    key
  };
};
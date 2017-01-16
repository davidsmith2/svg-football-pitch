export const toggleOrientation = (orientation) => {
  console.log('calling action creator');
  return {
    type: 'TOGGLE_ORIENTATION',
    orientation
  };
};

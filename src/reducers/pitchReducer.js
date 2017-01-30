const initialState = {
  orientation: 'landscape',
  length: 115,
  width: 73,
  scale: 2
};

export default function pitch(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORIENTATION':
      return Object.assign({}, state, {
        orientation: action.orientation
      });
    case 'SET_WIDTH':
      return Object.assign({}, state, {
        width: action.width
      });
    case 'SET_LENGTH':
      return Object.assign({}, state, {
        length: action.length
      });
    case 'SET_SCALE_FACTOR':
      return Object.assign({}, state, {
        scale: action.scale
      });
    default:
      return state;
  }
}

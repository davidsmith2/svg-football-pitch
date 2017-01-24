const initialState = {
  orientation: 'horizontal',
  length: 115,
  width: 73,
  scaleFactor: 2
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
        scaleFactor: action.scaleFactor
      });
    default:
      return state;
  }
}

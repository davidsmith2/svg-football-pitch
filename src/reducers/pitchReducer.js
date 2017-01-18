const initialState = {
  orientation: 'horizontal',
  length: 115,
  width: 73,
  scaleFactor: 6
};

export default function pitch(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORIENTATION':
      console.log(`calling reducer: ${action.type}`);
      return Object.assign({}, state, {
        orientation: action.orientation
      });
    case 'SET_WIDTH':
      console.log(`calling reducer: ${action.type}`);
      return Object.assign({}, state, {
        width: action.width
      });
    case 'SET_LENGTH':
      console.log(`calling reducer: ${action.type}`);
      return Object.assign({}, state, {
        length: action.length
      });
    case 'SET_SCALE_FACTOR':
      console.log(`calling reducer: ${action.type}`);
      return Object.assign({}, state, {
        scaleFactor: action.scaleFactor
      });
    default:
      console.log(`calling reducer: default`);
      return state;
  }
}

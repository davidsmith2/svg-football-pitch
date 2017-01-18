const initialState = {
  x: -2,
  y: -2
};

export default function marker(state = initialState, action) {
  switch (action.type) {
    case 'SET_MARKER':
      console.log(`calling reducer: ${action.type}`);
      const nextState = Object.assign({}, state, {
        x: action.marker.x,
        y: action.marker.y
      });
      return nextState;
    default:
      console.log(`calling reducer: default`);
      return state;
  }
}

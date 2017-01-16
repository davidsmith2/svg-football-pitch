export const svgFootballPitch = (state = {orientation: 'vertical'}, action) => {
  console.log('calling reducer');
  switch (action.type) {
    case 'TOGGLE_ORIENTATION':
      return Object.assign({}, state, {
        orientation: action.orientation
      });
    default:
      return state;
  }
};
const initialState = {
  activeTab: 1
};

export default function tabs(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_TAB':
      return Object.assign({}, state, {activeTab: action.key});
    default:
      return state;
  }
}
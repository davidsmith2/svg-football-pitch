import {connect} from 'react-redux';

import {toggleOrientation} from '../actions';
import {App} from '../App';

const mapStateToProps = (state) => {
  console.log('mapping state to props');
  return {
    orientation: state.orientation
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapping dispatch to props');
  return {
    onInputChange: (event) => {
      console.log('dispatching action');
      dispatch(toggleOrientation(event.target.value));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
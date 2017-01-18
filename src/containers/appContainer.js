import {connect} from 'react-redux';

import {
  setOrientation,
  setWidth,
  setLength,
  setScaleFactor,
  setMarker
} from '../actions';
import {App} from '../App';

const mapStateToProps = (state) => {
  console.log('mapping state to props');
  return {
    orientation: state.orientation,
    width: state.width,
    length: state.length,
    scaleFactor: state.scaleFactor,
    marker: state.marker
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapping dispatch to props');
  return {
    onOrientationChange: (event) => {
      console.log('dispatching action');
      dispatch(setOrientation(event.target.value));
    },
    onWidthChange: (event) => {
      console.log('dispatching action');
      dispatch(setWidth(parseInt(event.target.value, 10)));
    },
    onLengthChange: (event) => {
      console.log('dispatching action');
      dispatch(setLength(parseInt(event.target.value, 10)));
    },
    onScaleFactorChange: (event) => {
      console.log('dispatching action');
      dispatch(setScaleFactor(parseInt(event.target.value, 10)));
    },
    onMarkerChange: (func, event) => {
      console.log('dispatching action');
      event.preventDefault();
      dispatch(setMarker(func(event)));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
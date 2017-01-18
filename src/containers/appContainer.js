import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from '../actions';
import {App} from '../App';

const mapStateToProps = (state) => {
  console.log('mapping state to props');
  return {
    pitch: state.pitch,
    marker: state.marker
  };
};


const mapDispatchToProps = (dispatch) => {
  console.log('mapping dispatch to props');
  const boundActionCreators = bindActionCreators(actionCreators, dispatch);
  return {
    onOrientationChange: (event) => {
      console.log('dispatching action');
      boundActionCreators.setOrientation(event.target.value);
    },
    onWidthChange: (event) => {
      console.log('dispatching action');
      boundActionCreators.setWidth(parseInt(event.target.value, 10));
    },
    onLengthChange: (event) => {
      console.log('dispatching action');
      boundActionCreators.setLength(parseInt(event.target.value, 10));
    },
    onScaleFactorChange: (event) => {
      console.log('dispatching action');
      boundActionCreators.setScaleFactor(parseInt(event.target.value, 10));
    },
    onMarkerChange: (func, event) => {
      console.log('dispatching action');
      event.preventDefault();
      boundActionCreators.setMarker(func(event));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from '../actions';
import {App} from '../App';

const mapStateToProps = (state) => {
  return {
    pitch: state.pitch,
    marker: state.marker,
    tabs: state.tabs
  };
};


const mapDispatchToProps = (dispatch) => {
  const boundActionCreators = bindActionCreators(actionCreators, dispatch);
  return {
    onOrientationChange: (event) => {
      boundActionCreators.setOrientation(event.target.value);
    },
    onWidthChange: (event) => {
      boundActionCreators.setWidth(parseInt(event.target.value, 10));
    },
    onLengthChange: (event) => {
      boundActionCreators.setLength(parseInt(event.target.value, 10));
    },
    onScaleFactorChange: (event) => {
      boundActionCreators.setScaleFactor(parseInt(event.target.value, 10));
    },
    onMarkerChange: (func, event) => {
      event.preventDefault();
      boundActionCreators.setMarker(func(event));
    },
    onTabChange: () => {
      boundActionCreators.setTab(event);
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
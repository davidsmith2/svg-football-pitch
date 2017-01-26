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
    onMarkerChange: (func, router, event) => {
      event.preventDefault();
      const cursorPoint = func(event);
      const path = `/${router.params.tab}?x=${cursorPoint[0]}&y=${cursorPoint[1]}`;
      router.push(path);
      boundActionCreators.setMarker(cursorPoint);
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
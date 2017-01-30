import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from '../actions';
import {App} from '../App';

const mapStateToProps = (state) => {
  return {
    pitch: state.pitch,
    markers: state.markers,
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
    onScaleChange: (event) => {
      boundActionCreators.setScale(parseInt(event.target.value, 10));
    },
    onMarkerChange: (marker) => {
      boundActionCreators.setMarker(marker);
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
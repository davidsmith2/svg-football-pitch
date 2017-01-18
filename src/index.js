import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import svgFootballPitch from './reducers';
import AppContainer from './containers/appContainer';

let store = createStore(svgFootballPitch);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

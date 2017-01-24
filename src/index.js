import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {
  hashHistory,
  IndexRoute,
  Router,
  Route
} from 'react-router';

import './index.css';
import svgFootballPitch from './reducers';

import AppContainer from './containers/appContainer';
import {Tabs} from './components/tabs';


let store = createStore(svgFootballPitch);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Tabs} />
        <Route path=":tab" component={Tabs} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

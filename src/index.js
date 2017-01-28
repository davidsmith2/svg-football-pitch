import {useBasename} from 'history';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {
  browserHistory,
  IndexRoute,
  Router,
  Route
} from 'react-router';

import {Tabs} from './components/tabs';
import AppContainer from './containers/appContainer';
import svgFootballPitch from './reducers';
import './index.css';

let store = createStore(svgFootballPitch);

render(
  <Provider store={store}>
    <Router history={useBasename(() => browserHistory)({basename: process.env.PUBLIC_URL})}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Tabs} />
        <Route path=":tab" component={Tabs} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

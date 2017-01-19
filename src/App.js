import React from 'react';
import {omit, pick} from 'lodash';

import {Controls} from './components/controls';
import {Pitch} from './components/pitch';
import './App.css';
import {styles} from './styles';

export const App = (props) => {
  return (
    <div style={styles.app}>
      <Controls
        data={
          omit(
            props, ['marker', 'onMarkerChange']
          )
        }
      />
      <Pitch
        data={
          pick(
            props, ['marker', 'onMarkerChange', 'pitch']
          )
        }
      />
    </div>
  );
};

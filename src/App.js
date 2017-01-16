import React from 'react';

import './App.css';
import {Pitch} from './components/pitch';
import {PitchFactory} from './core/pitches';

export const App  = () => {
  return (
    <Pitch
      pitchFactory={
        PitchFactory(
          {
            orientation: 'horizontal',
            scaleFactor: 6
          }
        )
      }
    />
  );
};

export default App;

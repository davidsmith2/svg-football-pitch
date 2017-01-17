import React from 'react';

import {Controls} from './components/controls';
import {Pitch} from './components/pitch';
import './App.css';
import {PitchFactory} from './core/pitches';
import {styles} from './styles';

export const App = (props) => {
  const pitchFactory = PitchFactory({
    orientation: props.orientation,
    scaleFactor: 4,
    width: 110,
    height: 55
  });
  return (
    <div style={styles.app}>
      <Controls orientation={props.orientation} onInputChange={props.onInputChange} />
      <Pitch pitchFactory={pitchFactory} />
    </div>
  );
};

export default App;

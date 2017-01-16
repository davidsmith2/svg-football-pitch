import React from 'react';

import {Controls} from './components/controls';
import {Pitch} from './components/pitch';
import './App.css';
import {styles} from './styles';
import {PitchFactory} from './core/pitches';

export const App = (props) => {
  const pitchFactory = PitchFactory({
    orientation: props.orientation,
    scaleFactor: 4
  });
  return (
    <div id="test" style={styles.test}>
      <Controls orientation={props.orientation} onInputChange={props.onInputChange} />
      <Pitch pitchFactory={pitchFactory} />
    </div>
  );
};

export default App;

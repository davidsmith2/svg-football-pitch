import React from 'react';

import {Controls} from './components/controls';
import {Pitch} from './components/pitch';
import './App.css';
import {PitchFactory} from './core/pitches';
import {styles} from './styles';

export const App = (props) => {
  const {orientation, scaleFactor, width, length} = props.pitch;
  const pitchFactory = PitchFactory({
    orientation: orientation,
    scaleFactor: scaleFactor,
    width: width,
    length: length
  });
  return (
    <div style={styles.app}>
      <Controls
        length={length}
        orientation={orientation}
        scaleFactor={scaleFactor}
        width={width}
        onLengthChange={props.onLengthChange}
        onOrientationChange={props.onOrientationChange}
        onScaleFactorChange={props.onScaleFactorChange}
        onWidthChange={props.onWidthChange}
      />
      <Pitch
        pitchFactory={pitchFactory}
        marker={props.marker}
        onMarkerChange={props.onMarkerChange}
      />
    </div>
  );
};

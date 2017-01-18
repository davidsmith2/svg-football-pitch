import React from 'react';

import {Controls} from './components/controls';
import {Pitch} from './components/pitch';
import './App.css';
import {PitchFactory} from './core/pitches';
import {styles} from './styles';

export const App = (props) => {
  console.log('orientation: ' + props.orientation);
  console.log('length: ' + props.length);
  console.log('width: ' + props.width);
  console.log('scale factor: ' + props.scaleFactor);
  const pitchFactory = PitchFactory({
    orientation: props.orientation,
    scaleFactor: props.scaleFactor,
    width: props.width,
    length: props.length
  });
  return (
    <div style={styles.app}>
      <Controls
        orientation={props.orientation}
        onOrientationChange={props.onOrientationChange}
        width={props.width}
        onWidthChange={props.onWidthChange}
        length={props.length}
        onLengthChange={props.onLengthChange}
        scaleFactor={props.scaleFactor}
        onScaleFactorChange={props.onScaleFactorChange}
      />
      <Pitch
        pitchFactory={pitchFactory}
        marker={props.marker}
        onMarkerChange={props.onMarkerChange}
      />
    </div>
  );
};

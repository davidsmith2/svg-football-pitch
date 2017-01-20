import React from 'react';
import {wrap} from 'lodash';

import {styles} from '../styles';
import {Lines} from './lines';
import {Arcs} from './arcs';
import {ShotMarker} from './shot';
import {ShotTooltip} from './shot';
import {ShotTriangle} from './shot';

export const Image = (props) => {
  const {marker, onMarkerChange, pitch} = props.data;
  const pitchFactory = props.pitchFactory;
  console.log(pitch);
  pitchFactory.getCursorPoint = pitchFactory.getCursorPoint.bind(pitchFactory);
  return (
    <div
      id="pitch"
      onClick={wrap(pitchFactory.getCursorPoint, onMarkerChange)}
      style={styles.pitch.image.container}
    >
      <svg
        fill="transparent"
        height={pitchFactory.getHeightInPixels()}
        style={styles.pitch.image.svg}
        width={pitchFactory.getWidthInPixels()}
      >
        <g
          transform={pitchFactory.transform()}
        >
          <Lines />
          <Arcs />
          {pitchFactory.inPlay(marker.activeMarker.unscaled) &&
          <g>
            <ShotMarker
              cx={marker.activeMarker.unscaled[0] * pitch.scaleFactor}
              cy={marker.activeMarker.unscaled[1] * pitch.scaleFactor}
              fill='red'
              id="shot-marker"
              r={pitch.scaleFactor}
            />
            <ShotTriangle
              data={pitchFactory.getTriangle(marker.activeMarker.unscaled)}
              id="shot-triangle"
              stroke="yellow"
            />
          </g>
          }
        </g>
      </svg>
      {pitchFactory.inPlay(marker.activeMarker.unscaled) &&
      <ShotTooltip
        coords={marker.activeMarker.unscaled}
        data={pitchFactory.triangulateCoords(marker.activeMarker.unscaled)}
        id="shot-tooltip"
        style={pitchFactory.getTooltipPosition(marker.activeMarker.unscaled)}
      />
      }
    </div>
  );
};

Image.contextTypes = {
  pitchFactory: React.PropTypes.object.isRequired
};
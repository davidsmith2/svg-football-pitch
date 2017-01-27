import React from 'react';

import {Arcs} from './arcs';
import {Lines} from './lines';
import {
  Angle,
  Marker,
  Tooltip
} from './shot';
import {styles} from '../styles';

export const Image = (props) => {
  const {activeMarker} = props.data;
  const {scale} = props.data.location.query;
  const pitchFactory = props.pitchFactory;
  pitchFactory.getCursorPoint = pitchFactory.getCursorPoint.bind(pitchFactory);
  return (
    <div
      id="image"
      style={styles.pitch.image.container}
    >
      <div
        onClick={(event) => {
          event.preventDefault();
          props.handleClick(pitchFactory.getCursorPoint(event))
        }}
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
            {pitchFactory.inPlay(activeMarker) &&
            <g>
              <Marker
                cx={activeMarker[0] * scale}
                cy={activeMarker[1] * scale}
                fill='red'
                id="shot-marker"
                r={scale}
              />
              <Angle
                data={pitchFactory.getTriangle(activeMarker)}
                id="shot-triangle"
                stroke="yellow"
              />
            </g>
            }
          </g>
        </svg>
      </div>
      {pitchFactory.inPlay(activeMarker) &&
        <Tooltip
          activeMarker={activeMarker}
          data={pitchFactory.triangulateCoords(activeMarker)}
          id="shot-tooltip"
          linkPathname="/graph"
          linkTitle="View on graph"
          scale={scale}
          style={pitchFactory.getTooltipPosition(activeMarker)}
        />
      }
    </div>
  );
};

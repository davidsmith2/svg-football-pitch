import React from 'react';
import {partial, wrap} from 'lodash';

import {styles} from '../styles';
import {Lines} from './lines';
import {Arcs} from './arcs';
import {
  Angle,
  Marker,
  Tooltip
} from './shot';

export const Image = (props, context) => {
  const {marker, onMarkerChange, pitch} = props.data;
  const pitchFactory = props.pitchFactory;
  pitchFactory.getCursorPoint = pitchFactory.getCursorPoint.bind(pitchFactory);
  return (
    <div
      id="image"
      style={styles.pitch.image.container}
    >
      <div
        onClick={partial(wrap(pitchFactory.getCursorPoint, onMarkerChange), context.router)}
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
            {pitchFactory.inPlay(marker.activeMarker) &&
            <g>
              <Marker
                cx={marker.activeMarker[0] * pitch.scaleFactor}
                cy={marker.activeMarker[1] * pitch.scaleFactor}
                fill='red'
                id="shot-marker"
                r={pitch.scaleFactor}
              />
              <Angle
                data={pitchFactory.getTriangle(marker.activeMarker)}
                id="shot-triangle"
                stroke="yellow"
              />
            </g>
            }
          </g>
        </svg>
      </div>
      {pitchFactory.inPlay(marker.activeMarker) &&
        <Tooltip
          activeMarker={marker.activeMarker}
          data={pitchFactory.triangulateCoords(marker.activeMarker)}
          id="shot-tooltip"
          linkPathname="/graph"
          linkTitle="View on graph"
          style={pitchFactory.getTooltipPosition(marker.activeMarker)}
        />
      }
    </div>
  );
};

Image.contextTypes = {
  router: React.PropTypes.object
};
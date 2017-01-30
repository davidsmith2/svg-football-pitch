import React, {Component} from 'react';

import {Arcs} from './arcs';
import {Lines} from './lines';
import {
  Angle,
  Marker,
  Tooltip
} from './shot';
import {styles} from '../styles';

export class Image extends Component {
  render() {
    const pitchFactory = this.props.pitchFactory;
    const {activeMarker, location} = this.props.data;
    const {orientation, scale} = location.query;
    const x = activeMarker[0];
    const y = activeMarker[1];
    return (
      <div
        id="image"
        style={styles.pitch.image.container}
      >
        <div
          onClick={(event) => {
            event.preventDefault();
            this.props.handleClick(pitchFactory.getCursorPoint(event))
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
                  cx={pitchFactory.getMarkerCenterX(activeMarker)}
                  cy={pitchFactory.getMarkerCenterY(activeMarker)}
                  fill='red'
                  id='marker'
                  r={scale}
                />
                <Angle
                  data={pitchFactory.getAngle(activeMarker)}
                  id='angle'
                  stroke='yellow'
                />
              </g>
              }
            </g>
          </svg>
        </div>
        {pitchFactory.inPlay(activeMarker) &&
        <Tooltip
          data={pitchFactory.triangulateCoords(activeMarker)}
          id="tooltip"
          link={{
            label: 'View on graph',
            pathname: `/graph`,
            query: {
              orientation,
              scale,
              x,
              y
            }
          }}
          style={pitchFactory.getTooltipPosition(activeMarker)}
        />
        }
      </div>
    );
  }
}
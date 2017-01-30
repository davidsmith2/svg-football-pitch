import React, { Component } from 'react';

import {Tooltip} from './shot';
import {styles} from '../styles';

export class Graph extends Component {
  componentDidMount() {
    this.renderAxes();
  }
  render() {
    const pitchFactory = this.props.pitchFactory;
    const {activeMarker, location, markers} = this.props.data;
    const {orientation, scale} = location.query;
    const x = activeMarker[0];
    const y = activeMarker[1];
    return (
      <div
        id="graph"
        style={styles.pitch.image.container}
      >
        <div>
          <svg
            height={pitchFactory.getHeightInPixels()}
            ref="graph"
            style={{padding: pitchFactory.settings.perimeter * scale}}
            width={pitchFactory.getWidthInPixels()}
          >
            <g>
              {markers.map((obj, i) => {
                if (pitchFactory.inPlay(obj)) {
                  return (
                    <circle
                      cx={pitchFactory.getMarkerCenterX(obj)}
                      cy={pitchFactory.getMarkerCenterY(obj)}
                      key={`shot-marker-${i}`}
                      onClick={(event) => {
                        event.preventDefault();
                        this.props.handleClick(obj)
                      }}
                      r={scale}
                    />
                  );
                } else {
                  return null;
                }
              })};
            </g>
            <g ref="x-axis" />
            <g ref="y-axis" />
          </svg>
        </div>
        {pitchFactory.inPlay(activeMarker) &&
          <Tooltip
            data={pitchFactory.triangulateCoords(activeMarker)}
            id="shot-tooltip"
            link={{
              label: 'View on image',
              pathname: `/image`,
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
  renderAxes() {
    this.props.pitchFactory.drawAxis(this.refs['x-axis'], 'x');
    this.props.pitchFactory.drawAxis(this.refs['y-axis'], 'y');
  }
}

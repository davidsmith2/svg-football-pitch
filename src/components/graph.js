import React, { Component } from 'react';
import {partial, wrap} from 'lodash';

import {styles} from '../styles';
import {Tooltip} from './shot';

export class Graph extends Component {
  componentDidMount() {
    this.renderAxes();
  }
  renderAxes() {
    this.props.pitchFactory.drawAxis(this.refs['x-axis'], 'x');
    this.props.pitchFactory.drawAxis(this.refs['y-axis'], 'y');
  }
  render() {
    const {marker, onMarkerChange, pitch} = this.props.data;
    const pitchFactory = this.props.pitchFactory;
    this.renderAxes();
    return (
      <div
        id="graph"
        style={styles.pitch.image.container}
      >
        <div>
          <svg
            height={pitchFactory.getHeightInPixels()}
            ref="graph"
            style={{padding: pitchFactory.settings.perimeter * pitch.scaleFactor}}
            width={pitchFactory.getWidthInPixels()}
          >
            <g>
              {marker.allMarkers.map((obj, i) => {
                if (pitchFactory.inPlay(obj)) {
                  return (
                    <circle
                      cx={obj[0] * pitch.scaleFactor}
                      cy={obj[1] * pitch.scaleFactor}
                      key={`shot-marker-${i}`}
                      onClick={partial(wrap(() => obj, onMarkerChange), this.context.router)}
                      r={pitch.scaleFactor}
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
        {pitchFactory.inPlay(marker.activeMarker) &&
          <Tooltip
            activeMarker={marker.activeMarker}
            data={pitchFactory.triangulateCoords(marker.activeMarker)}
            id="shot-tooltip"
            linkPathname="/image"
            linkTitle="View on image"
            style={pitchFactory.getTooltipPosition(marker.activeMarker)}
          />
        }
      </div>
    );
  }
}

Graph.contextTypes = {
  router: React.PropTypes.object
};
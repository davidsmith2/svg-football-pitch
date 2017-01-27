import React, { Component } from 'react';
import {partial} from 'lodash';

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
    const {activeMarker, markers} = this.props.data;
    const {scale} = this.props.data.location.query;
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
            style={{padding: pitchFactory.settings.perimeter * scale}}
            width={pitchFactory.getWidthInPixels()}
          >
            <g>
              {markers.map((obj, i) => {
                if (pitchFactory.inPlay(obj)) {
                  return (
                    <circle
                      cx={obj[0] * scale}
                      cy={obj[1] * scale}
                      key={`shot-marker-${i}`}
                      onClick={partial(this.props.clicky, obj)}
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
            activeMarker={activeMarker}
            data={pitchFactory.triangulateCoords(activeMarker)}
            id="shot-tooltip"
            linkPathname="/image"
            linkTitle="View on image"
            scale={scale}
            style={pitchFactory.getTooltipPosition(activeMarker)}
          />
        }
      </div>
    );
  }
}

Graph.contextTypes = {
  router: React.PropTypes.object
};
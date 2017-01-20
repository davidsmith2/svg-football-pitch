import React, { Component } from 'react';
import {wrap} from 'lodash';

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
      <div>
        <svg
          height={pitchFactory.getHeightInPixels()}
          ref="graph"
          style={{padding: pitchFactory.settings.perimeter * pitch.scaleFactor}}
          width={pitchFactory.getWidthInPixels()}
        >
          <g>
            {marker.allMarkers.map((obj, i) => {
              if (pitchFactory.inPlay(obj.unscaled)) {
                return (
                  <circle
                    cx={obj.unscaled[0] * pitch.scaleFactor}
                    cy={obj.unscaled[1] * pitch.scaleFactor}
                    key={`shot-marker-${i}`}
                    onClick={wrap(() => obj, onMarkerChange)}
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
    );
  }
}
import React, { Component } from 'react';
import * as d3 from 'd3';
import {wrap} from 'lodash';

import {styles} from '../styles';

export class Graph extends Component {
  componentDidMount() {
    this.renderAxes();
  }
  renderAxes() {
    // set the ranges
    this.renderAxis('x-axis', this.props.pitchFactory.getXAxis());
    this.renderAxis('y-axis', this.props.pitchFactory.getYAxis());
  }
  renderAxis(axisType, axis) {
    d3
      .select(this.refs[axisType])
      .call(axis);
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
          style={styles.pitch.graph.svg}
          width={pitchFactory.getWidthInPixels()}
        >
          <g>
            {marker.allMarkers.map((obj, i) => {
              if (pitchFactory.inPlay(obj.unscaled)) {
                return (
                  <circle
                    cx={obj.scaled[0]}
                    cy={obj.scaled[1]}
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
import React, { Component } from 'react';
import * as d3 from "d3";
import {wrap} from 'lodash';

import {styles} from '../styles';
import {Lines} from './lines';
import {Arcs} from './arcs';
import {ShotMarker} from './shot';
import {ShotTooltip} from './shot';
import {ShotTriangle} from './shot';

/**
 Pitch
 */
export class Pitch extends Component {
  static childContextTypes = {
    pitchFactory: React.PropTypes.object.isRequired
  };
  getChildContext() {
    return {
      pitchFactory: this.props.pitchFactory
    }
  }
  componentDidMount() {
    //this.d3();
  }
  componentDidUpdate() {
    //this.d3();
  }
  d3() {
    this.renderAxis(this.pitchFactory.getXAxis());
    this.renderAxis(this.pitchFactory.getYAxis());
  }
  renderAxis(axis) {
    d3
      .select(this.refs.pitch)
      .call(axis);
  }
  render() {
    const {pitchFactory, marker, onMarkerChange} = this.props;
    const {scaleFactor} = pitchFactory.settings;
    const coords = pitchFactory.getCoords(marker);
    pitchFactory.getCursorPoint = pitchFactory.getCursorPoint.bind(pitchFactory);
    return (
      <div
        id="pitch"
        onClick={wrap(pitchFactory.getCursorPoint, onMarkerChange)}
        style={styles.pitch.container}
      >
        <svg
          fill="transparent"
          height={pitchFactory.getHeightInPixels()}
          width={pitchFactory.getWidthInPixels()}
          style={styles.pitch.svg}
        >
          <g
            ref="pitch"
            transform={pitchFactory.transform()}
          >
            <Lines />
            <Arcs />
            {pitchFactory.inPlay(coords) &&
            <g>
              <ShotMarker
                id="shot-marker"
                r={scaleFactor}
                fill='red'
                cx={marker.x}
                cy={marker.y}
              />
              <ShotTriangle
                id="shot-triangle"
                data={pitchFactory.getTriangle(coords)}
                stroke="yellow"
              />
            </g>
            }
          </g>
        </svg>
        {pitchFactory.inPlay(coords) &&
        <ShotTooltip
          id="shot-tooltip"
          coords={coords}
          data={pitchFactory.triangulateCoords(coords)}
          style={pitchFactory.getTooltipPosition(coords)}
        />
        }
      </div>
    );
  }
}
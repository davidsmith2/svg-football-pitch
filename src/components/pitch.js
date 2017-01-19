import React, { Component } from 'react';
import {wrap} from 'lodash';

import {PitchFactory} from '../core/pitches';
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
      pitchFactory: this.pitchFactory
    }
  }
  render() {
    const {data} = this.props;
    this.pitchFactory = PitchFactory(data.pitch);
    const {marker, onMarkerChange} = data;
    const {scaleFactor} = data.pitch;
    const coords = this.pitchFactory.getCoords(marker);
    this.pitchFactory.getCursorPoint = this.pitchFactory.getCursorPoint.bind(this.pitchFactory);
    return (
      <div
        id="pitch"
        onClick={wrap(this.pitchFactory.getCursorPoint, onMarkerChange)}
        style={styles.pitch.container}
      >
        <svg
          fill="transparent"
          height={this.pitchFactory.getHeightInPixels()}
          style={styles.pitch.svg}
          width={this.pitchFactory.getWidthInPixels()}
        >
          <g
            ref="pitch"
            transform={this.pitchFactory.transform()}
          >
            <Lines />
            <Arcs />
            {this.pitchFactory.inPlay(coords) &&
            <g>
              <ShotMarker
                cx={marker.x}
                cy={marker.y}
                fill='red'
                id="shot-marker"
                r={scaleFactor}
              />
              <ShotTriangle
                data={this.pitchFactory.getTriangle(coords)}
                id="shot-triangle"
                stroke="yellow"
              />
            </g>
            }
          </g>
        </svg>
        {this.pitchFactory.inPlay(coords) &&
        <ShotTooltip
          coords={coords}
          data={this.pitchFactory.triangulateCoords(coords)}
          id="shot-tooltip"
          style={this.pitchFactory.getTooltipPosition(coords)}
        />
        }
      </div>
    );
  }
}
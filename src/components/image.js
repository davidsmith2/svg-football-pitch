import React, {Component} from 'react';

import {Arcs} from './arcs';
import {Dialog} from './modal';
import {Lines} from './lines';
import {
  Angle,
  Marker,
  Tooltip
} from './shot';
import {styles} from '../styles';

export class Image extends Component {
  constructor(props) {
    super(props);
    this.onClickContainer = this.onClickContainer.bind(this);
  }
  render() {
    const pitchFactory = this.props.pitchFactory;
    const {activeMarker, location} = this.props.data;
    const {orientation, scale} = location.query;
    const x = activeMarker[0];
    const y = activeMarker[1];
    return (
      <div
        id="image"
        style={Object.assign({}, styles.pitch.container.outer, {
          height: pitchFactory.getHeightInPixels(),
          width: pitchFactory.getWidthInPixels(),
        })}
      >
        <div
          onClick={this.onClickContainer}
          style={styles.pitch.container.inner}
        >
          <svg
            fill="transparent"
            style={Object.assign({}, styles.pitch.svg, {
              backgroundColor: 'green'
            })}
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
        <Dialog
          show={this.props.showModal}
          title="Image view"
          body={this.getModalBody()}
          onClickClose={this.props.closeModal}
        />
      </div>
    );
  }
  getModalBody() {
    return (
      <ul>
        <li>Click inside the touchlines/goal lines to display positional statistics.
          <ul>
            <li>Click on "View on graph" to plot the positional statistics to a graph.</li>
          </ul>
        </li>
        <li>Click outside the touchlines/goal lines to dismiss positional statistics.</li>
      </ul>
    );
  }
  onClickContainer(event) {
    event.preventDefault();
    this.props.handleClick(this.props.pitchFactory.getCursorPoint(event));

  }
}
import React, { Component } from 'react';

import {Dialog} from './modal';
import {
  Marker,
  Tooltip
} from './shot';
import {styles} from '../styles';

export class Graph extends Component {
  constructor(props) {
    super(props);
    this.onClickContainer = this.onClickContainer.bind(this);
  }
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
            ref="graph"
            style={Object.assign({}, styles.pitch.svg, {
              padding: pitchFactory.settings.perimeter * scale
            })}
          >
            <g>
              {markers.map((obj, i) => {
                if (pitchFactory.inPlay(obj)) {
                  return (
                    <Marker
                      cx={pitchFactory.getMarkerCenterX(obj)}
                      cy={pitchFactory.getMarkerCenterY(obj)}
                      fill='red'
                      id={obj}
                      key={`shot-marker-${i}`}
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
        <Dialog
          show={this.props.showModal}
          title="Graph view"
          body={this.getModalBody()}
          onClickClose={this.props.closeModal}
        />
      </div>
    );
  }
  renderAxes() {
    this.props.pitchFactory.drawAxis(this.refs['x-axis'], 'x');
    this.props.pitchFactory.drawAxis(this.refs['y-axis'], 'y');
  }
  getModalBody() {
    return (
      <ul>
        <li>Click on a marker to display positional statistics.
          <ul>
            <li>Click on "View on image" to view the positional statistics on the image.</li>
          </ul>
        </li>
      </ul>
    );
  }
  onClickContainer(event) {
    event.preventDefault();
    let coords = event.target.id.split(',');
    if (coords.length !== 2) {
      coords = [-1, -1];
    }
    this.props.handleClick(coords);
  }
}

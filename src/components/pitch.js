import React, { Component } from 'react';
import * as d3 from "d3";

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
  constructor(props) {
    super(props);
    this.pitchFactory = this.props.pitchFactory;
    this.state = {
      marker: {
        x: -2,
        y: -2
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    //this.d3();
    this.pitchFactory = this.props.pitchFactory;
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
  handleClick(e) {
    e.preventDefault();
    this.setState({
      marker: this.pitchFactory.getCursorPoint(e)
    });
  }
  render() {
    this.pitchFactory = this.props.pitchFactory;
    const coords = this.pitchFactory.getCoords(this.state.marker);
    const {scaleFactor} = this.pitchFactory.settings;
    const {x, y} = this.state.marker;
    return (
      <div id="pitch" onClick={this.handleClick} style={styles.pitch.container}>
        <svg
          fill="transparent"
          height={this.pitchFactory.getHeightInPixels()}
          width={this.pitchFactory.getWidthInPixels()}
          style={styles.pitch.svg}
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
                id="shot-marker"
                r={scaleFactor}
                fill='red'
                cx={x}
                cy={y}
              />
              <ShotTriangle
                id="shot-triangle"
                data={this.pitchFactory.getTriangle(coords)}
                stroke="yellow"
              />
            </g>
            }
          </g>
        </svg>
        {this.pitchFactory.inPlay(coords) &&
        <ShotTooltip
          id="shot-tooltip"
          data={this.pitchFactory.triangulateCoords(coords)}
          style={this.pitchFactory.getTooltipPosition(coords)}
        />
        }
      </div>
    );
  }
}
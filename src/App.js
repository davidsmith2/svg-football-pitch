import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {partial} from 'lodash';

import './App.css';
import {breakpoints} from './styles';
import {Tabs} from './components/tabs';

export class App extends Component {
  constructor(props) {
    super(props);
    this.renderPitch = this.renderPitch.bind(this);
  }
  render() {
    return (
      <div>
        <MediaQuery maxWidth={breakpoints.md - 1}>
          {partial(this.renderPitch, this.getScaleFactor(breakpoints.sm))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.md} maxWidth={breakpoints.lg - 1}>
          {partial(this.renderPitch, this.getScaleFactor(breakpoints.md))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.lg} maxWidth={breakpoints.xl - 1}>
          {partial(this.renderPitch, this.getScaleFactor(breakpoints.lg))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.xl}>
          {partial(this.renderPitch, this.getScaleFactor(breakpoints.xl))}
        </MediaQuery>
      </div>
    );
  }
  renderPitch(scaleFactor, matches) {
    return (
      matches && <Tabs
        marker={this.props.marker}
        onMarkerChange={this.props.onMarkerChange}
        pitch={Object.assign({}, this.props.pitch, {scaleFactor})}
        tabs={this.props.tabs}
        onTabChange={this.props.onTabChange}
        tab={this.props.params.tab}
      />
    );
  }
  getScaleFactor(breakpoint) {
    return Math.floor((breakpoint / this.props.pitch.length) - 1);
  }
}
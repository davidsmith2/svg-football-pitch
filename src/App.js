import {partial} from 'lodash';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import {Tabs} from './components/tabs';
import './App.css';
import {breakpoints} from './styles';

export class App extends Component {
  constructor(props) {
    super(props);
    this.renderTabs = this.renderTabs.bind(this);
  }
  render() {
    return (
      <div>
        <MediaQuery maxWidth={breakpoints.md - 1}>
          {partial(this.renderTabs, breakpoints.sm)}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.md} maxWidth={breakpoints.lg - 1}>
          {partial(this.renderTabs, breakpoints.md)}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.lg} maxWidth={breakpoints.xl - 1}>
          {partial(this.renderTabs, breakpoints.lg)}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.xl}>
          {partial(this.renderTabs, breakpoints.xl)}
        </MediaQuery>
      </div>
    );
  }
  renderTabs(breakpoint, matches) {
    const data = Object.assign({}, this.props, {
      activeMarker: this.getActiveMarker(),
      scaleFactor: this.getScaleFactor(breakpoint)
    });
    return (
      matches && <Tabs data={data} />
    );
  }
  getActiveMarker() {
    const {x, y} = this.props.location.query;
    return [Number(x), Number(y)];
  }
  getScaleFactor(breakpoint) {
    return Math.floor((breakpoint / this.props.pitch.length) - 1);
  }
}

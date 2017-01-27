import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {partial} from 'lodash';

import './App.css';
import {breakpoints} from './styles';
import {Tabs} from './components/tabs';

export class App extends Component {
  constructor(props) {
    super(props);
    this.renderTabs = this.renderTabs.bind(this);
  }
  render() {
    return (
      <div>
        <MediaQuery maxWidth={breakpoints.md - 1}>
          {partial(this.renderTabs, this.getScaleFactor(breakpoints.sm))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.md} maxWidth={breakpoints.lg - 1}>
          {partial(this.renderTabs, this.getScaleFactor(breakpoints.md))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.lg} maxWidth={breakpoints.xl - 1}>
          {partial(this.renderTabs, this.getScaleFactor(breakpoints.lg))}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.xl}>
          {partial(this.renderTabs, this.getScaleFactor(breakpoints.xl))}
        </MediaQuery>
      </div>
    );
  }
  renderTabs(scaleFactor, matches) {
    const data = Object.assign({}, this.props, {
      activeMarker: this.getActiveMarker(),
      scaleFactor
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

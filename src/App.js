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
          <MediaQuery orientation='landscape'>
            {partial(this.renderTabs, {
              breakpoint: breakpoints.sm,
              orientation: 'landscape'
            })}
          </MediaQuery>
          <MediaQuery orientation='portrait'>
            {partial(this.renderTabs, {
              breakpoint: breakpoints.sm,
              orientation: 'portrait'
            })}
          </MediaQuery>
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.md} maxWidth={breakpoints.lg - 1}>
          {partial(this.renderTabs, {
            breakpoint: breakpoints.md,
            orientation: 'landscape'
          })}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.lg} maxWidth={breakpoints.xl - 1}>
          {partial(this.renderTabs, {
            breakpoint: breakpoints.lg,
            orientation: 'landscape'
          })}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.xl}>
          {partial(this.renderTabs, {
            breakpoint: breakpoints.xl,
            orientation: 'landscape'
          })}
        </MediaQuery>
      </div>
    );
  }
  renderTabs(options, matches) {
    const {x, y} = this.props.location.query;
    const data = Object.assign({}, this.props, {
      activeMarker: this.getActiveMarker(x, y),
      scale: this.getScale(options.breakpoint),
      orientation: options.orientation
    });
    return (
      matches && <Tabs data={data} />
    );
  }
  getActiveMarker(x, y) {
    let realX = x;
    let realY = y;
    if (typeof x === 'undefined' && typeof y === 'undefined') {
      realX = 0;
      realY = 0;
    }
    return [Number(realX), Number(realY)];
  }
  getScale(breakpoint) {
    return Math.floor((breakpoint / this.props.pitch.length) - 1);
  }
}

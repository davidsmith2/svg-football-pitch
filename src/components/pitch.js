import React, { Component } from 'react';

import {PitchFactory} from '../core/pitches';
import {styles} from '../styles';
import {Graph} from './graph';
import {Image} from './image';

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
    this.pitchFactory = PitchFactory(this.props.data.pitch);
    return (
      <div style={styles.pitch.container}>
        <div style={{float: 'left'}}>
          <Image data={this.props.data} pitchFactory={this.pitchFactory} />
        </div>
        <div style={{float: 'right'}}>
          <Graph data={this.props.data} pitchFactory={this.pitchFactory} />
        </div>
      </div>
    );
  }
}
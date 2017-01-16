import React, { Component } from 'react';

import {Line} from './line';

/**
 Lines
 */
export class Lines extends Component {
  static contextTypes = {
    pitchFactory: React.PropTypes.object.isRequired
  };
  render() {
    const pitchFactory = this.context.pitchFactory;
    return (
      <g ref="lines">
        {this.renderCollection('goal-areas', pitchFactory.getGoalAreas())};
        {this.renderCollection('goal-lines', pitchFactory.getGoalLines())};
        {this.renderCollection('goals', pitchFactory.getGoals())};
        {this.renderItem({id: 'halfway-line', data: pitchFactory.getHalfwayLine()})}
        {this.renderCollection('penalty-areas', pitchFactory.getPenaltyAreas())};
        {this.renderCollection('touch-lines', pitchFactory.getTouchLines())};
      </g>
    );
  }
  renderCollection(id, data) {
    const collection = data.map((d, i) => {
      return this.renderItem({
        key: `${id}-${i}`,
        id: `${id}-${i}`,
        data: d
      });
    });
    return (<g id={id}>{collection}</g>);
  }
  renderItem(options) {
    return (<Line {...options} />);
  }
}


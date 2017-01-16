import React, { Component } from 'react';

import {Arc} from './arc';

/**
 Arcs
 */
export class Arcs extends Component {
  static contextTypes = {
    pitchFactory: React.PropTypes.object.isRequired
  };
  render() {
    const pitchFactory = this.context.pitchFactory;
    return (
      <g ref="arcs">
        {this.renderItem({id: 'center-circle', data: pitchFactory.getCenterCircle(), transform: pitchFactory.transformCenterCircle()})}
        {this.renderItem({id: 'center-mark', data: pitchFactory.getCenterMark(), transform: pitchFactory.transformCenterMark()})}
        {this.renderCollection('corner-arcs', pitchFactory.getCornerArcs(), pitchFactory.transformCornerArc.bind(pitchFactory))}
        {this.renderCollection('penalty-arcs', pitchFactory.getPenaltyArcs(), pitchFactory.transformPenaltyArc.bind(pitchFactory))}
        {this.renderCollection('penalty-marks', pitchFactory.getPenaltyMarks(), pitchFactory.transformPenaltyMark.bind(pitchFactory))}
      </g>
    );
  }
  renderCollection(id, data, transform) {
    const collection = data.map((d, i) => {
      return this.renderItem({
        key: `${id}-${i}`,
        id: `${id}-${i}`,
        data: d,
        transform: transform(i)
      })
    });
    return (<g id={id}>{collection}</g>);
  }
  renderItem(options) {
    return (<Arc {...options} />);
  }
}


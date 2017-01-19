import React from 'react';

import {Line} from './line';
import {styles} from '../styles';

/**
 * Should value be expressed in singular or plural?
 * @param value
 * @param unit
 * @returns {string}
 */
function format(value, unit) {
  if (value !== 1) {
    unit += 's';
  }
  return `${value} ${unit}`;
}

/**
 Shot marker
 */
export const ShotMarker = (props) => <circle {...props} />;

/**
 Shot triangle
 */
export const ShotTriangle = (props) => <Line {...props} />;

/**
 Shot tooltip
 */
export const ShotTooltip = (props) => {
  const style = Object.assign({}, styles.pitch.image.tooltip, props.style);
  return (
    <div id={props.id} style={style}>
      <dl>
        <dt>Coordinates</dt>
        <dd>{props.coords.join(', ')}</dd>
        <dt>Near post</dt>
        <dd>{format(props.data.nearPost, 'yard')}</dd>
        <dt>Far post</dt>
        <dd>{format(props.data.farPost, 'yard')}</dd>
        <dt>Angle</dt>
        <dd>{format(props.data.angle, 'degree')}</dd>
      </dl>
    </div>
  );
};

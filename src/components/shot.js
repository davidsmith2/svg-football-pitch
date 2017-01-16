import React from 'react';

import {Line} from './line';
import {styles} from '../styles';

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
  const style = Object.assign({}, styles.tooltip, props.style);
  return (
    <div id={props.id} style={style}>
      <dl>
        <dt>Coordinates</dt>
        <dd>{props.data.coords.join(', ')}</dd>
        <dt>Near post</dt>
        <dd>{props.data.nearPost}</dd>
        <dt>Far post</dt>
        <dd>{props.data.farPost}</dd>
        <dt>Angle</dt>
        <dd>{props.data.angle}</dd>
      </dl>
    </div>
  );
};


import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';

import {Line} from './line';

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
  return (
    <div>
      <Popover
        arrowOffsetTop={25}
        id={props.id}
        placement="right"
        positionLeft={props.style.left}
        positionTop={props.style.top - 30}
        title={<h5>{props.coords.join(', ')}</h5>}
      >
        <p>
          <strong>Near post:</strong> {format(props.data.nearPost, 'yard')}
        </p>
        <p>
          <strong>Far post:</strong> {format(props.data.farPost, 'yard')}
        </p>
        <p>
          <strong>Angle:</strong> {format(props.data.angle, 'degree')}
        </p>
      </Popover>
    </div>
  );
};

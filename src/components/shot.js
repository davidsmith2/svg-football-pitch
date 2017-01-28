import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import {Link} from 'react-router';

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
export const Marker = (props) => <circle {...props} />;

/**
 Shot triangle
 */
export const Angle = (props) => <Line {...props} />;

/**
 Shot tooltip
 */
export const Tooltip = (props) => {
  const title = [props.link.query.x, props.link.query.y].join(', ');
  const link = {
    pathname: props.link.pathname,
    query: props.link.query
  };
  return (
    <div>
      <Popover
        arrowOffsetTop={25}
        id={props.id}
        placement="right"
        positionLeft={props.style.left}
        positionTop={props.style.top - 30}
        title={title}
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
        <Link to={link}>{props.link.label}</Link>
      </Popover>
    </div>
  );
};

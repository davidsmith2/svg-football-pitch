import React from 'react';

import {Path} from './path';

/**
 Arc
 */
export const Arc = (props, context) => {
  const draw = context.pitchFactory.drawArc();
  return (
    <Path
      {...props}
      d={draw(props.data)}
    />
  );
};

Arc.contextTypes = {
  pitchFactory: React.PropTypes.object.isRequired
};


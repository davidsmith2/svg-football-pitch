import React from 'react';

import {Path} from './path';

/**
 Line
 */
export const Line = (props, context) => {
  const draw = context.pitchFactory.drawLine();
  return (
    <Path
      {...props}
      d={draw(props.data)}
    />
  );
};

Line.contextTypes = {
  pitchFactory: React.PropTypes.object.isRequired
};


import {basicPitch} from './basicPitch';
import {horizontalPitch} from './horizontalPitch';
import {verticalPitch} from './verticalPitch';

const pitches = {
  basic: basicPitch,
  horizontal: horizontalPitch,
  vertical: verticalPitch
};

export const PitchFactory = (options) => {
  const defaults = {
    orientation: 'horizontal',
    length: 115,
    width: 73,
    perimeter: 5,
    scaleFactor: 2
  };
  const settings = Object.assign({}, defaults, options);
  const pitch = Object.assign(
    {},
    {settings},
    pitches.basic,
    pitches[settings.orientation]
  );
  return pitch;
};

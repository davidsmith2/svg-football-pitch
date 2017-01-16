import {basicPitch} from './basic';
import {horizontalPitch} from './horizontal';
import {verticalPitch} from './vertical';

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
  console.log(pitch);
  return pitch;
};

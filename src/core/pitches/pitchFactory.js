import {basicPitch} from './basicPitch';
import {landscapePitch} from './landscapePitch';
import {portraitPitch} from './portraitPitch';

const pitches = {
  basic: basicPitch,
  landscape: landscapePitch,
  portrait: portraitPitch
};

export const PitchFactory = (options) => {
  const defaults = {
    orientation: 'landscape',
    length: 115,
    width: 73,
    perimeter: 5,
    scale: 2
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

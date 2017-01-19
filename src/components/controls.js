import React from 'react';

import {styles} from '../styles';

export const Controls = (props) => {
  return (
    <div id="controls" style={styles.controls}>
      <form>
        <fieldset>
          <legend>Orientation</legend>
          <label>
            <input
              name="orientation"
              type="radio"
              value="vertical"
              onChange={props.data.onOrientationChange}
              defaultChecked={props.data.pitch.orientation === 'vertical'}
            />
            Vertical
          </label>
          <label>
            <input
              name="orientation"
              type="radio"
              value="horizontal"
              onChange={props.data.onOrientationChange}
              defaultChecked={props.data.pitch.orientation === 'horizontal'}
            />
            Horizontal
          </label>
        </fieldset>
        <fieldset>
          <legend>Dimensions</legend>
          <label>
            Length
            <input
              name="length"
              type="text"
              value={props.data.pitch.length}
              onChange={props.data.onLengthChange}
            />
          </label>
          <label>
            Width
            <input
              name="width"
              type="text"
              value={props.data.pitch.width}
              onChange={props.data.onWidthChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Scale</legend>
          <label>
            Factor
            <select
              name="scaleFactor"
              value={props.data.pitch.scaleFactor}
              onChange={props.data.onScaleFactorChange}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </label>
        </fieldset>
      </form>
    </div>
  );
};
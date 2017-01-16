import React from 'react';

export const Controls = (props) => {
  console.log(props.orientation);
  return (
    <div id="controls">
      <form>
        <label>
          <input
            name="orientation"
            type="radio"
            value="vertical"
            onClick={props.onInputChange}
            defaultChecked={props.orientation === 'vertical'}
          />
          Vertical
        </label>
        <label>
          <input
            name="orientation"
            type="radio"
            value="horizontal"
            onClick={props.onInputChange}
            defaultChecked={props.orientation === 'horizontal'}
          />
          Horizontal
        </label>
      </form>
    </div>
  );
};
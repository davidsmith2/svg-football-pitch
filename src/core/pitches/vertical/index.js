import * as d3 from "d3";
import {multiply} from 'lodash';

import * as CONSTANTS from '../../constants';
import {translate} from '../../utils';

function getGoalAreas() {
  const length = CONSTANTS.GOAL_AREA_LENGTH;
  const offset = CONSTANTS.GOAL_AREA_OFFSET;
  return [
    [
      [this.getMidwayLinePoint() - offset, 0],
      [this.getMidwayLinePoint() - offset, length],
      [this.getMidwayLinePoint() + offset, length],
      [this.getMidwayLinePoint() + offset, 0]
    ],
    [
      [this.getMidwayLinePoint() - offset, this.settings.length],
      [this.getMidwayLinePoint() - offset, this.settings.length - length],
      [this.getMidwayLinePoint() + offset, this.settings.length - length],
      [this.getMidwayLinePoint() + offset, this.settings.length]
    ]
  ];
}

function getGoalLines() {
  return [
    [
      [0, 0],
      [this.settings.width, 0]
    ],
    [
      [0, this.settings.length],
      [this.settings.width, this.settings.length]
    ]
  ];
}

function getGoalPosts() {
  const offset = CONSTANTS.GOAL_POST_OFFSET;
  return [
    [
      [this.getMidwayLinePoint() - offset, 0],
      [this.getMidwayLinePoint() + offset, 0]
    ],
    [
      [this.getMidwayLinePoint() - offset, this.settings.length],
      [this.getMidwayLinePoint() + offset, this.settings.length]
    ]
  ];
}

function getGoals() {
  const height = CONSTANTS.GOAL_HEIGHT;
  const offset = CONSTANTS.GOAL_OFFSET;
  return [
    [
      [this.getMidwayLinePoint() - offset, 0],
      [this.getMidwayLinePoint() - offset, -height],
      [this.getMidwayLinePoint() + offset, -height],
      [this.getMidwayLinePoint() + offset, 0]
    ],
    [
      [this.getMidwayLinePoint() - offset, this.settings.length],
      [this.getMidwayLinePoint() - offset, this.settings.length + height],
      [this.getMidwayLinePoint() + offset, this.settings.length + height],
      [this.getMidwayLinePoint() + offset, this.settings.length]
    ]
  ];
}

function getHalfwayLine() {
  return [
    [0, this.getHalfwayLinePoint()],
    [this.settings.width, this.getHalfwayLinePoint()]
  ];
}

function getHeightInPixels() {
  const {length, perimeter, scaleFactor} = this.settings;
  return (multiply(length, scaleFactor)) + ((perimeter * 2) * scaleFactor);
}

function getPenaltyArcs() {
  const radius = CONSTANTS.PENALTY_ARC_RADIUS;
  return [
    {radius: radius, startAngle: 127, endAngle: 233},
    {radius: radius, startAngle: 53, endAngle: -53}
  ];
}

function getPenaltyAreas() {
  const length = CONSTANTS.PENALTY_AREA_LENGTH;
  const offset = CONSTANTS.PENALTY_AREA_OFFSET;
  return [
    [
      [this.getMidwayLinePoint() - offset, 0],
      [this.getMidwayLinePoint() - offset, length],
      [this.getMidwayLinePoint() + offset, length],
      [this.getMidwayLinePoint() + offset, 0]
    ],
    [
      [this.getMidwayLinePoint() - offset, this.settings.length],
      [this.getMidwayLinePoint() - offset, this.settings.length - length],
      [this.getMidwayLinePoint() + offset, this.settings.length - length],
      [this.getMidwayLinePoint() + offset, this.settings.length]
    ]
  ];
}

function getTouchLines() {
  return [
    [
      [0, 0],
      [0, this.settings.length],
    ],
    [
      [this.settings.width, 0],
      [this.settings.width, this.settings.length]
    ]
  ];
}

function getWidthInPixels() {
  const {width, perimeter, scaleFactor} = this.settings;
  return (multiply(width, scaleFactor)) + ((perimeter * 2) * scaleFactor);
}

function getXScale() {
  const {width, scaleFactor} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, width])
    .range([0, multiply(width, scaleFactor)]);
}

function getYScale() {
  const {length, scaleFactor} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, length])
    .range([0, multiply(length, scaleFactor)]);
}

function inPlay(coords) {
  const withinTouchLines = coords[0] > -1 && coords[0] <= this.settings.width;
  const withinGoalLines = coords[1] > -1 && coords[1] <= this.settings.length;
  return withinTouchLines && withinGoalLines;
}

function transformCenterCircle() {
  const tx = this.getMidwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getHalfwayLinePoint() * this.settings.scaleFactor;
  return translate(tx, ty);
}

function transformCenterMark() {
  const tx = this.getMidwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getHalfwayLinePoint() * this.settings.scaleFactor;
  return translate(tx, ty);
}

function transformCornerArc(i) {
  let tx;
  let ty;
  if (i === 0) {
    tx = 0;
    ty = 0;
  }
  if (i === 1) {
    tx = this.settings.width * this.settings.scaleFactor;
    ty = 0;
  }
  if (i === 2) {
    tx = this.settings.width * this.settings.scaleFactor;
    ty = this.settings.length * this.settings.scaleFactor;
  }
  if (i === 3) {
    tx = 0;
    ty = this.settings.length * this.settings.scaleFactor;
  }
  return translate(tx, ty);
}

function transformPenaltyArc(i) {
  const tx = this.getMidwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getPenaltyMarkPoint(i) * this.settings.scaleFactor;
  return translate(tx, ty);
}

function transformPenaltyMark(i) {
  const tx = this.getMidwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getPenaltyMarkPoint(i) * this.settings.scaleFactor;
  return translate(tx, ty);
}

export const verticalPitch = {
  getGoalAreas,
  getGoalLines,
  getGoalPosts,
  getGoals,
  getHalfwayLine,
  getHeightInPixels,
  getPenaltyArcs,
  getPenaltyAreas,
  getTouchLines,
  getWidthInPixels,
  getXScale,
  getYScale,
  inPlay,
  transformCenterCircle,
  transformCenterMark,
  transformCornerArc,
  transformPenaltyArc,
  transformPenaltyMark
};
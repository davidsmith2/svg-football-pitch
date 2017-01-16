import * as d3 from "d3";

import * as CONSTANTS from '../../constants';
import {_getPenaltyArcs} from '../basic';

function getPenaltyArcs() {
  return _getPenaltyArcs(0);
}

function transformCenterCircle() {
  const tx = this.getHalfwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getMidwayLinePoint() * this.settings.scaleFactor;
  return this.translate(tx, ty);
}

function transformCenterMark() {
  const tx = this.getHalfwayLinePoint() * this.settings.scaleFactor;
  const ty = this.getMidwayLinePoint() * this.settings.scaleFactor;
  return this.translate(tx, ty);
}

function transformCornerArc(i) {
  let tx;
  let ty;
  if (i === 0) {
    tx = 0;
    ty = 0;
  }
  if (i === 1) {
    tx = this.settings.length * this.settings.scaleFactor;
    ty = 0;
  }
  if (i === 2) {
    tx = this.settings.length * this.settings.scaleFactor;
    ty = this.settings.width * this.settings.scaleFactor;
  }
  if (i === 3) {
    tx = 0;
    ty = this.settings.width * this.settings.scaleFactor;
  }
  return this.translate(tx, ty);
}

function transformPenaltyArc(i) {
  const tx = this.getPenaltyMarkPoint(i) * this.settings.scaleFactor;
  const ty = this.getMidwayLinePoint() * this.settings.scaleFactor;
  return this.translate(tx, ty);
}

function transformPenaltyMark(i) {
  const tx = this.getPenaltyMarkPoint(i) * this.settings.scaleFactor;
  const ty = this.getMidwayLinePoint() * this.settings.scaleFactor;
  return this.translate(tx, ty);
}

function getGoalAreas() {
  const length = CONSTANTS.GOAL_AREA_LENGTH;
  const offset = CONSTANTS.GOAL_AREA_OFFSET;
  return [
    [
      [0, this.getMidwayLinePoint() - offset],
      [length, this.getMidwayLinePoint() - offset],
      [length, this.getMidwayLinePoint() + offset],
      [0, this.getMidwayLinePoint() + offset]
    ],
    [
      [this.settings.length, this.getMidwayLinePoint() - offset],
      [this.settings.length - length, this.getMidwayLinePoint() - offset],
      [this.settings.length - length, this.getMidwayLinePoint() + offset],
      [this.settings.length, this.getMidwayLinePoint() + offset]
    ]
  ];
}

function getGoalLines() {
  return [
    [
      [0, 0],
      [0, this.settings.width]
    ],
    [
      [this.settings.length, 0],
      [this.settings.length, this.settings.width]
    ]
  ]
}

function getGoalPosts() {
  const offset = CONSTANTS.GOAL_POST_OFFSET;
  return [
    [
      [0, this.getMidwayLinePoint() - offset],
      [0, this.getMidwayLinePoint() + offset]
    ],
    [
      [this.settings.length, this.getMidwayLinePoint() - offset],
      [this.settings.length, this.getMidwayLinePoint() + offset]
    ]
  ];
}

function getGoals() {
  const offset = CONSTANTS.GOAL_OFFSET;
  const height = CONSTANTS.GOAL_HEIGHT;
  return [
    [
      [0, this.getMidwayLinePoint() - offset],
      [-height, this.getMidwayLinePoint() - offset],
      [-height, this.getMidwayLinePoint() + offset],
      [0, this.getMidwayLinePoint() + offset]
    ],
    [
      [this.settings.length, this.getMidwayLinePoint() - offset],
      [this.settings.length + height, this.getMidwayLinePoint() - offset],
      [this.settings.length + height, this.getMidwayLinePoint() + offset],
      [this.settings.length, this.getMidwayLinePoint() + offset]
    ]
  ];
}

function getHalfwayLine() {
  return [
    [this.getHalfwayLinePoint(), 0],
    [this.getHalfwayLinePoint(), this.settings.width]
  ];
}

function getPenaltyAreas() {
  const length = CONSTANTS.PENALTY_AREA_LENGTH;
  const offset = CONSTANTS.PENALTY_AREA_OFFSET;
  return [
    [
      [0, this.getMidwayLinePoint() - offset],
      [length, this.getMidwayLinePoint() - offset],
      [length, this.getMidwayLinePoint() + offset],
      [0, this.getMidwayLinePoint() + offset]
    ],
    [
      [this.settings.length, this.getMidwayLinePoint() - offset],
      [this.settings.length - length, this.getMidwayLinePoint() - offset],
      [this.settings.length - length, this.getMidwayLinePoint() + offset],
      [this.settings.length, this.getMidwayLinePoint() + offset]
    ]
  ];
}

function getTouchLines() {
  return [
    [
      [0, 0],
      [this.settings.length, 0],
    ],
    [
      [0, this.settings.width],
      [this.settings.length, this.settings.width]
    ]
  ];
}

function getWidthInPixels() {
  return this.convertWidthToPixels() + this.toSquare(this.settings.perimeter * this.settings.scaleFactor);
}

function getHeightInPixels() {
  return this.convertLengthToPixels() + this.toSquare(this.settings.perimeter * this.settings.scaleFactor);
}

function inPlay(coords) {
  const withinGoalLines = coords[0] > -1 && coords[0] <= this.settings.length;
  const withinTouchLines = coords[1] > -1 && coords[1] <= this.settings.width;
  return withinGoalLines && withinTouchLines;
}

function getXScale() {
  return d3
    .scaleLinear()
    .domain([0, this.settings.width])
    .range([0, this.convertWidthToPixels()]);
}

function getYScale() {
  return d3
    .scaleLinear()
    .domain([0, this.settings.length])
    .range([0, this.convertLengthToPixels()]);
}

export const horizontalPitch = {
  getGoalAreas,
  getGoalLines,
  getGoalPosts,
  getGoals,
  getHalfwayLine,
  getPenaltyArcs,
  getPenaltyAreas,
  getTouchLines,
  transformCenterCircle,
  transformCenterMark,
  transformCornerArc,
  transformPenaltyArc,
  transformPenaltyMark,
  getWidthInPixels,
  getHeightInPixels,
  inPlay,
  getXScale,
  getYScale
};
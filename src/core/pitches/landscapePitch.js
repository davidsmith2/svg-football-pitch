import * as d3 from 'd3';
import {multiply} from 'lodash';

import {
  getTooltipPositionPart,
  __triangulateCoords__
} from './basicPitch';
import * as CONSTANTS from '../constants';
import {translate} from '../utils';

function getAngle(activeMarker) {
  return [
    activeMarker,
    this.getGoalPosts()[0][0],
    this.getGoalPosts()[0][1],
    activeMarker
  ];
}

function getCursorPoint(event) {
  const {perimeter, scale} = this.settings;
  const offset = perimeter * scale;
  const svg = document.querySelector('svg');
  const pt = svg.createSVGPoint();
  pt.x = event.clientX - offset;
  pt.y = event.clientY - offset;
  const {x, y} = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [x, y].map((value) => Math.round(value / scale));
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

function getHeightInPixels() {
  const {width, perimeter, scale} = this.settings;
  return (multiply(width, scale)) + ((perimeter * 2) * scale);
}

function getMarkerCenterX(activeMarker) {
  return (activeMarker[0] * this.settings.scale) || 0;
}

function getMarkerCenterY(activeMarker) {
  return (activeMarker[1] * this.settings.scale) || 0;
}

function getPenaltyArcs() {
  const radius = CONSTANTS.PENALTY_ARC_RADIUS;
  return [
    {radius: radius, startAngle: 37, endAngle: 143},
    {radius: radius, startAngle: 323, endAngle: 217}
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

function getTooltipPosition(activeMarker) {
  const left = getTooltipPositionPart.call(this, activeMarker[0]);
  const top = getTooltipPositionPart.call(this, activeMarker[1]) - 40;
  return {
    arrowOffsetLeft: -10,
    arrowOffsetTop: 35,
    left,
    placement: 'right',
    top
  };
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
  const {length, perimeter, scale} = this.settings;
  return (multiply(length, scale)) + ((perimeter * 2) * scale);
}

function getXScale() {
  const {length, scale} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, length])
    .range([0, multiply(length, scale)]);
}

function getYScale() {
  const {width, scale} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, width])
    .range([0, multiply(width, scale)]);
}

function transformCenterCircle() {
  const tx = this.getHalfwayLinePoint() * this.settings.scale;
  const ty = this.getMidwayLinePoint() * this.settings.scale;
  return translate(tx, ty);
}

function transformCenterMark() {
  const tx = this.getHalfwayLinePoint() * this.settings.scale;
  const ty = this.getMidwayLinePoint() * this.settings.scale;
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
    tx = this.settings.length * this.settings.scale;
    ty = 0;
  }
  if (i === 2) {
    tx = this.settings.length * this.settings.scale;
    ty = this.settings.width * this.settings.scale;
  }
  if (i === 3) {
    tx = 0;
    ty = this.settings.width * this.settings.scale;
  }
  return translate(tx, ty);
}

function transformPenaltyArc(i) {
  const tx = this.getPenaltyMarkPoint(i) * this.settings.scale;
  const ty = this.getMidwayLinePoint() * this.settings.scale;
  return translate(tx, ty);
}

function transformPenaltyMark(i) {
  const tx = this.getPenaltyMarkPoint(i) * this.settings.scale;
  const ty = this.getMidwayLinePoint() * this.settings.scale;
  return translate(tx, ty);
}

function triangulateCoords() {
  return __triangulateCoords__.apply(this, arguments);
}

export const landscapePitch = {
  getAngle,
  getCursorPoint,
  getGoalAreas,
  getGoalLines,
  getGoalPosts,
  getGoals,
  getHalfwayLine,
  getHeightInPixels,
  getMarkerCenterX,
  getMarkerCenterY,
  getPenaltyArcs,
  getPenaltyAreas,
  getTooltipPosition,
  getTouchLines,
  getWidthInPixels,
  getXScale,
  getYScale,
  transformCenterCircle,
  transformCenterMark,
  transformCornerArc,
  transformPenaltyArc,
  transformPenaltyMark,
  triangulateCoords
};
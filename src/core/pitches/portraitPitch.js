import * as d3 from 'd3';
import {multiply} from 'lodash';

import {
  getTooltipPositionPart,
  __triangulateCoords__
} from './basicPitch';
import * as CONSTANTS from '../constants';
import {translate} from '../utils';

function getAngle(activeMarker) {
  const reversedActiveMarker = activeMarker.slice().reverse();
  return [
    reversedActiveMarker,
    this.getGoalPosts()[0][0],
    this.getGoalPosts()[0][1],
    reversedActiveMarker
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
  return [y, x].map((value) => Math.round(value / scale));
}

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
  const {length, perimeter, scale} = this.settings;
  return (multiply(length, scale)) + ((perimeter * 2) * scale);
}

function getMarkerCenterX(activeMarker) {
  return (activeMarker[1] * this.settings.scale) || 0;
}

function getMarkerCenterY(activeMarker) {
  return (activeMarker[0] * this.settings.scale) || 0;
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

function getTooltipPosition(activeMarker) {
  const left = getTooltipPositionPart.call(this, activeMarker[1]) - 40;
  const top = getTooltipPositionPart.call(this, activeMarker[0]);
  return {
    arrowOffsetLeft: 35,
    arrowOffsetTop: -10,
    left,
    placement: 'bottom',
    top
  };
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
  const {width, perimeter, scale} = this.settings;
  return (multiply(width, scale)) + ((perimeter * 2) * scale);
}

function getXScale() {
  const {width, scale} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, width])
    .range([0, multiply(width, scale)]);
}

function getYScale() {
  const {length, scale} = this.settings;
  return d3
    .scaleLinear()
    .domain([0, length])
    .range([0, multiply(length, scale)]);
}

function transformCenterCircle() {
  const tx = this.getMidwayLinePoint() * this.settings.scale;
  const ty = this.getHalfwayLinePoint() * this.settings.scale;
  return translate(tx, ty);
}

function transformCenterMark() {
  const tx = this.getMidwayLinePoint() * this.settings.scale;
  const ty = this.getHalfwayLinePoint() * this.settings.scale;
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
    tx = this.settings.width * this.settings.scale;
    ty = 0;
  }
  if (i === 2) {
    tx = this.settings.width * this.settings.scale;
    ty = this.settings.length * this.settings.scale;
  }
  if (i === 3) {
    tx = 0;
    ty = this.settings.length * this.settings.scale;
  }
  return translate(tx, ty);
}

function transformPenaltyArc(i) {
  const tx = this.getMidwayLinePoint() * this.settings.scale;
  const ty = this.getPenaltyMarkPoint(i) * this.settings.scale;
  return translate(tx, ty);
}

function transformPenaltyMark(i) {
  const tx = this.getMidwayLinePoint() * this.settings.scale;
  const ty = this.getPenaltyMarkPoint(i) * this.settings.scale;
  return translate(tx, ty);
}

function triangulateCoords(activeMarker) {
  const reversedActiveMarker = activeMarker.slice().reverse();
  return __triangulateCoords__.call(this, reversedActiveMarker);
}

export const portraitPitch = {
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
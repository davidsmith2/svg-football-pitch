import * as d3 from 'd3';

import * as CONSTANTS from '../constants';
import triangulator from '../triangulator';
import {
  getCoord,
  toRadians,
  translate
} from '../utils';

function drawArc() {
  return d3
    .arc()
    .innerRadius((d) => d.radius * this.settings.scale)
    .outerRadius((d) => d.radius * this.settings.scale)
    .startAngle((d) => toRadians(d.startAngle))
    .endAngle((d) => toRadians(d.endAngle))
}

function drawAxis(selector, axisType) {
  const getAxis = (axisType === 'x') ? getXAxis : getYAxis;
  return d3
    .select(selector)
    .call(getAxis.call(this));
}

function drawLine() {
  return d3
    .line()
    .x((d) => d[0] * this.settings.scale)
    .y((d) => d[1] * this.settings.scale)
}

function getCenterCircle() {
  return {
    radius: CONSTANTS.CENTER_CIRCLE_RADIUS,
    startAngle: 0,
    endAngle: 360
  }
}

function getCenterMark() {
  return {
    radius: CONSTANTS.CENTER_MARK_RADIUS,
    startAngle: 0,
    endAngle: 360
  };
}

function getCoords(marker) {
  return [
    getCoord.call(this, marker[0]),
    getCoord.call(this, marker[1])
  ]
}

function getCornerArcs() {
  const radius = CONSTANTS.CORNER_ARC_RADIUS;
  return [
    {radius: radius, startAngle: 90, endAngle: 180},
    {radius: radius, startAngle: 180, endAngle: 270},
    {radius: radius, startAngle: 270, endAngle: 360},
    {radius: radius, startAngle: 0, endAngle: 90}
  ];
}

/**
function getDistanceToGoal(coord, goalType = 'nearest') {
  const inverseCoord = this.length - coord;
  const inverseMode = (inverseCoord) < (this.getHalfwayLinePoint());
  let distance;
  if (inverseMode) {
    distance = (goalType === 'farthest') ? coord : inverseCoord;
  } else {
    distance = (goalType === 'farthest') ? inverseCoord : coord;
  }
  return display(distance, 'yard');
}
 */

function getHalfwayLinePoint() {
  return this.settings.length / 2;
}

function getMidwayLinePoint() {
  return this.settings.width / 2;
}

function getPenaltyMarkPoint(i) {
  return (!!i) ? this.settings.length - CONSTANTS.PENALTY_MARK_LENGTH : CONSTANTS.PENALTY_MARK_LENGTH;
}

function getPenaltyMarks() {
  const radius = CONSTANTS.PENALTY_MARK_RADIUS;
  return [
    {radius: radius, startAngle: 0, endAngle: 360},
    {radius: radius, startAngle: 0, endAngle: 360}
  ];
}

export function getTooltipPositionPart(coord) {
  const {perimeter, scale} = this.settings;
  const offset = (perimeter * scale) + 5;
  return (coord * scale) + offset;
}

function getXAxis() {
  return d3
    .axisTop()
    .scale(this.getXScale())
    .tickSize(5);
}

function getYAxis() {
  return d3
    .axisLeft()
    .scale(this.getYScale())
    .tickSize(5);
}

function inPlay(activeMarker) {
  const withinGoalLines = activeMarker[0] > -1 && activeMarker[0] <= this.settings.length;
  const withinTouchLines = activeMarker[1] > -1 && activeMarker[1] <= this.settings.width;
  return withinGoalLines && withinTouchLines;
}

function transform() {
  let tx, ty;
  tx = ty = this.settings.perimeter * this.settings.scale;
  return translate(tx, ty);
}

export function __triangulateCoords__(activeMarker) {
  const sides = triangulator.getSides([this.getGoalPosts()[0][0], this.getGoalPosts()[0][1], activeMarker]);
  const sidesByLength = sides.slice().sort((a, b) => b.yards > a.yards);
  const angles = triangulator.getAngles(sidesByLength);
  return Object.assign(
    {},
    triangulator.getDistanceToPosts(sides),
    triangulator.getAngleToGoal(angles)
  );
}

export const basicPitch = {
  drawArc,
  drawAxis,
  drawLine,
  getCenterCircle,
  getCenterMark,
  getCoords,
  getCornerArcs,
  getHalfwayLinePoint,
  getMidwayLinePoint,
  getPenaltyMarks,
  getPenaltyMarkPoint,
  inPlay,
  transform
};
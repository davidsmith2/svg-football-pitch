import * as d3 from "d3";

import * as CONSTANTS from '../../constants';
import {
  getCoord,
  toRadians,
  translate
} from '../../utils';
import triangulator from '../../triangulator';

function drawArc() {
  return d3
    .arc()
    .innerRadius((d) => d.radius * this.settings.scaleFactor)
    .outerRadius((d) => d.radius * this.settings.scaleFactor)
    .startAngle((d) => toRadians(d.startAngle))
    .endAngle((d) => toRadians(d.endAngle))
}

function drawLine() {
  return d3
    .line()
    .x((d) => d[0] * this.settings.scaleFactor)
    .y((d) => d[1] * this.settings.scaleFactor)
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
    getCoord.call(this, marker.x),
    getCoord.call(this, marker.y)
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

function getCursorPoint(event) {
  const offset = this.settings.perimeter * this.settings.scaleFactor;
  const svg = document.querySelector('svg');
  const pt = svg.createSVGPoint();
  pt.x = event.clientX - offset;
  pt.y = event.clientY - offset;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
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

function getTooltipPosition(coords) {
  return {
    left: getTooltipPositionPart.call(this, coords[0]),
    top: getTooltipPositionPart.call(this, coords[1])
  };
}

function getTooltipPositionPart(coord) {
  const {perimeter, scaleFactor} = this.settings;
  const offset = (perimeter * scaleFactor) + 5;
  return (coord * scaleFactor) + offset;
}

function getTriangle(coords) {
  return [
    coords,
    this.getGoalPosts()[0][0],
    this.getGoalPosts()[0][1],
    coords
  ];
}

function getXAxis() {
  return d3
    .axisLeft()
    .scale(this.getXScale())
    .tickFormat('')
    .tickSize(0);
}

function getYAxis() {
  return d3
    .axisTop()
    .scale(this.getYScale())
    .tickFormat('')
    .tickSize(0);
}

function transform() {
  let tx, ty;
  tx = ty = this.settings.perimeter * this.settings.scaleFactor;
  return translate(tx, ty);
}

function triangulateCoords(coords) {
  const sides = triangulator.getSides([this.getGoalPosts()[0][0], this.getGoalPosts()[0][1], coords]);
  const angles = triangulator.getAngles(sides.sort((a, b) => b.yards > a.yards));
  return Object.assign(
    {},
    triangulator.getDistanceToPosts(sides),
    triangulator.getAngleToGoal(angles)
  );
}

export const basicPitch = {
  drawArc,
  drawLine,
  getCenterCircle,
  getCenterMark,
  getCoords,
  getCornerArcs,
  getCursorPoint,
  getHalfwayLinePoint,
  getMidwayLinePoint,
  getPenaltyMarks,
  getPenaltyMarkPoint,
  getTooltipPosition,
  getTriangle,
  getXAxis,
  getYAxis,
  transform,
  triangulateCoords
};
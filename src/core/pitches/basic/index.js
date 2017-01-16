import * as d3 from "d3";

import * as CONSTANTS from '../../constants';

function convertLengthToPixels() {
  return this.settings.length * this.settings.scaleFactor;
}

function convertWidthToPixels() {
  return this.settings.width * this.settings.scaleFactor;
}

function display (value, unit) {
  if (value !== 1) {
    unit += 's';
  }
  return `${value} ${unit}`;
}

function drawArc() {
  return d3
    .arc()
    .innerRadius((d) => d.radius * this.settings.scaleFactor)
    .outerRadius((d) => d.radius * this.settings.scaleFactor)
    .startAngle((d) => this.toRadians(d.startAngle))
    .endAngle((d) => this.toRadians(d.endAngle))
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

function getCoord(value) {
  return Math.round(value / this.settings.scaleFactor);
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

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toSquare(value) {
  return value * value;
}

function transform() {
  let tx, ty;
  tx = ty = this.settings.perimeter * this.settings.scaleFactor;
  return this.translate(tx, ty);
}

function translate(tx, ty) {
  return `translate(${tx}, ${ty})`;
}

function triangulateCoords(coords) {

  const getSideLength = (point1, point2) => {
    return Math.sqrt(this.toSquare(point2[0] - point1[0]) + this.toSquare(point2[1] - point1[1])).toFixed(3);
  };
  const getSide = (id, point1, point2) => {
    return {
      id: id,
      yards: getSideLength(point1, point2)
    };
  };
  const getAngle = (id, radians) => {
    return {
      id: id.toUpperCase(),
      radians: radians,
      degrees: this.toDegrees(radians).toFixed(3)
    };
  };
  const getAngle1 = (sides) => {
    const numerator = (this.toSquare(sides[1].yards) + this.toSquare(sides[2].yards)) - this.toSquare(sides[0].yards);
    const denominator = 2 * (sides[1].yards * sides[2].yards);
    const radians = Math.acos(numerator / denominator);
    return getAngle(sides[0].id, radians);
  };
  const getAngle2 = (sides, angle1)  => {
    const numerator = sides[1].yards * Math.sin(angle1.radians);
    const denominator = sides[0].yards;
    const radians = Math.asin(numerator / denominator);
    return getAngle(sides[1].id, radians);
  };
  const getAngle3 = (sides, angle1, angle2) => {
    const radians = this.toRadians(180) - (angle1.radians + angle2.radians);
    return getAngle(sides[2].id, radians);
  };
  const leftGoalPost = this.getGoalPosts()[0][0];
  const rightGoalPost = this.getGoalPosts()[0][1];
  const sideA = getSide('a', leftGoalPost, rightGoalPost);
  const sideB = getSide('b', rightGoalPost, coords);
  const sideC = getSide('c', leftGoalPost, coords);
  const sides = [sideA, sideB, sideC].sort((a, b) => b.yards > a.yards);
  const angle1 = getAngle1(sides);
  const angle2 = getAngle2(sides, angle1);
  const angle3 = getAngle3(sides, angle1, angle2);
  const nearPost = (sideB.yards <= sideC.yards) ? sideB.yards : sideC.yards;
  const farPost = (sideB.yards >= sideC.yards) ? sideB.yards : sideC.yards;
  const angle = [angle1, angle2, angle3].find((angle) => angle.id === 'A').degrees;
  return {
    coords: coords,
    nearPost: display(nearPost, 'yard'),
    farPost: display(farPost, 'yard'),
    angle: display(angle, 'degree')
  };
}

export const _getPenaltyArcs = (i) => {
  const radius = CONSTANTS.PENALTY_ARC_RADIUS;
  return [
    [
      {radius: radius, startAngle: 37, endAngle: 143},
      {radius: radius, startAngle: 323, endAngle: 217}
    ],
    [
      {radius: radius, startAngle: 127, endAngle: 233},
      {radius: radius, startAngle: 53, endAngle: -53}
    ]
  ][i];
};

export const basicPitch = {
  convertLengthToPixels,
  convertWidthToPixels,
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
  toSquare,
  toDegrees,
  toRadians,
  transform,
  translate,
  triangulateCoords
};
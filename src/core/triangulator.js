import {flow} from 'lodash';

import {
  toDegrees,
  toRadians,
  toSquare
} from './utils';

/**
 * Gets the angle of the triangle
 * @param id
 * @param radians
 * @returns {{id: string, radians: *, degrees: string}}
 */
const getAngle = (id, radians) => {
  return {
    id: id.toUpperCase(),
    radians: radians,
    degrees: toDegrees(radians).toFixed(3)
  };
};

/**
 * Gets the largest angle of the triangle
 * @param sides
 * @param angles
 * @returns {{angles: Array, sides: *}}
 */
const getAngle1 = (sides, angles = []) => {
  const numerator = (toSquare(sides[1].yards) + toSquare(sides[2].yards)) - toSquare(sides[0].yards);
  const denominator = 2 * (sides[1].yards * sides[2].yards);
  const radians = Math.acos(numerator / denominator);
  angles.push(getAngle(sides[0].id, radians));
  return {
    angles: angles,
    sides: sides
  };
};

/**
 * Gets the second-largest angle of the triangle
 * @param data
 * @returns {{angles: (Array|*), sides: *}}
 */
const getAngle2 = (data)  => {
  const numerator = data.sides[1].yards * Math.sin(data.angles[0].radians);
  const denominator = data.sides[0].yards;
  const radians = Math.asin(numerator / denominator);
  data.angles.push(getAngle(data.sides[1].id, radians));
  return {
    angles: data.angles,
    sides: data.sides
  };
};

/**
 * Gets the smallest angle of the triangle
 * @param data
 * @returns {Array|*}
 */
const getAngle3 = (data) => {
  const radians = toRadians(180) - (data.angles[0].radians + data.angles[1].radians);
  data.angles.push(getAngle(data.sides[2].id, radians));
  return data.angles;
};

/**
 * Gets the angles of a triangle based on the sides
 * @param sides
 * @returns {*}
 */
const getAngles = (sides) => {
  return flow([getAngle1, getAngle2, getAngle3])(sides);
};

/**
 * Gets the angle to goal based on all available angles
 * @param angles
 * @returns {{angle: string}}
 */
const getAngleToGoal = (angles) => {
  let angle = angles.find((angle) => angle.id === 'A').degrees;
  return {
    angle: angle
  };
};

/**
 * Gets the distance to the posts based on side lengths
 * @param sides
 * @returns {{nearPost: string, farPost: string}}
 */
const getDistanceToPosts = (sides) => {
  let distanceToNearPost;
  let distanceToFarPost;
  if (sides[1].yards <= sides[2].yards) {
    distanceToNearPost = sides[1].yards;
    distanceToFarPost = sides[2].yards;
  } else {
    distanceToNearPost = sides[2].yards;
    distanceToFarPost = sides[1].yards;
  }
  return {
    nearPost: distanceToNearPost,
    farPost: distanceToFarPost
  };
};

/**
 * Gets the length of a side of a triangle from two coordinates
 * @param pt1
 * @param pt2
 * @returns {string}
 */
const getSideLength = (pt1, pt2) => {
  return Math.sqrt(toSquare(pt2[0] - pt1[0]) + toSquare(pt2[1] - pt1[1])).toFixed(3);
};

/**
 * Gets the side of a triangle from two coordinates
 * @param id
 * @param pt1
 * @param pt2
 * @returns {{id: *, yards}}
 */
const getSide = (id, pt1, pt2) => {
  return {
    id: id,
    yards: getSideLength(pt1, pt2)
  };
};

/**
 * Gets the sides of a triangle from three coordinates
 * @param pts
 * @returns {[*,*,*]}
 */
const getSides = (pts) => {
  return [
    getSide('a', pts[0], pts[1]),
    getSide('b', pts[1], pts[2]),
    getSide('c', pts[0], pts[2])
  ];
};

const triangulator = {
  getAngles,
  getAngleToGoal,
  getDistanceToPosts,
  getSides
};

export default triangulator;

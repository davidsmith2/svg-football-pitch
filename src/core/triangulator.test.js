import triangulator from './triangulator';

const pts = [[0, 33], [0, 41], [12, 37]];
const sides = triangulator.getSides(pts);
const distanceToPosts = triangulator.getDistanceToPosts(sides);
const angles = triangulator.getAngles(sides);
const angleToGoal = triangulator.getAngleToGoal(angles);

it('should get sides', () => {
  expect(sides[0].id).toEqual('a');
  expect(sides[0].yards).toEqual('8.000');
  expect(sides[1].id).toEqual('b');
  expect(sides[1].yards).toEqual('12.649');
  expect(sides[2].id).toEqual('c');
  expect(sides[2].yards).toEqual('12.649');
});

it('should get distance to posts', () => {
  expect(distanceToPosts).toEqual({
    nearPost: '12.649',
    farPost: '12.649'
  });
});

it('should get angles', () => {
  expect(angles[0].id).toEqual('A');
  expect(angles[0].degrees).toEqual('36.870');
  expect(angles[1].id).toEqual('B');
  expect(angles[1].degrees).toEqual('71.565');
  expect(angles[2].id).toEqual('C');
  expect(angles[2].degrees).toEqual('71.565');
});

it('should get angle to goal', () => {
  expect(angleToGoal).toEqual({angle: '36.870'});
});

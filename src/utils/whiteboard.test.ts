import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampCoordinates,
  generateCurvedConnectionPath,
  filterWhiteboardNodes,
  calculateProficiencyStats,
  resetNodePositions,
  updateFloatingPhysics,
  calculateScatterImpulse,
} from './whiteboard.ts';
import type { WhiteboardNode, FloatingTechPhysics } from './whiteboard.ts';

const mockNodes: WhiteboardNode[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    proficiency: 'Proficient',
    x: 100,
    y: 100,
    icon: 'python',
    color: '#3776AB',
    accentBg: '#eef6fc',
    description: 'Core language for AI/ML and backend prototyping',
    docUrl: 'https://www.python.org/',
    relatedIds: ['numpy', 'pandas'],
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'aiml',
    proficiency: 'Proficient',
    x: 300,
    y: 120,
    icon: 'numpy',
    color: '#013243',
    accentBg: '#f0f7fa',
    description: 'Fundamental package for scientific computing with N-d arrays',
    docUrl: 'https://numpy.org/',
    relatedIds: ['pandas', 'scikit-learn'],
  },
  {
    id: 'react',
    name: 'React',
    category: 'web',
    proficiency: 'Working Knowledge',
    x: 500,
    y: 250,
    icon: 'react',
    color: '#61DAFB',
    accentBg: '#f0fbff',
    description: 'Frontend library for building reactive user interfaces',
    docUrl: 'https://react.dev/',
    relatedIds: ['javascript'],
  },
  {
    id: 'tensorflow',
    name: 'PyTorch / TF',
    category: 'aiml',
    proficiency: 'Currently Learning',
    x: 700,
    y: 350,
    icon: 'pytorch',
    color: '#EE4C2C',
    accentBg: '#fff5f3',
    description: 'Deep learning frameworks for neural network training',
    docUrl: 'https://pytorch.org/',
    relatedIds: [],
  },
];

test('clampCoordinates keeps nodes safely within bounds', () => {
  const bounds = { minX: 20, maxX: 1000, minY: 20, maxY: 600 };
  
  // Inside
  const valid = clampCoordinates({ x: 200, y: 150 }, bounds, 140, 56);
  assert.equal(valid.x, 200);
  assert.equal(valid.y, 150);

  // Left & Top overflow
  const underflow = clampCoordinates({ x: -50, y: 5 }, bounds, 140, 56);
  assert.equal(underflow.x, 20);
  assert.equal(underflow.y, 20);

  // Right & Bottom overflow
  const overflow = clampCoordinates({ x: 1200, y: 800 }, bounds, 140, 56);
  assert.equal(overflow.x, 1000 - 140);
  assert.equal(overflow.y, 600 - 56);
});

test('generateCurvedConnectionPath returns a valid SVG cubic bezier string', () => {
  const path = generateCurvedConnectionPath({ x: 100, y: 100 }, { x: 300, y: 200 });
  assert.match(path, /^M 100\.0 100\.0 C \d+\.\d+ \d+\.\d+, \d+\.\d+ \d+\.\d+, 300\.0 200\.0$/);
  
  // Zero distance returns empty string
  const empty = generateCurvedConnectionPath({ x: 100, y: 100 }, { x: 100, y: 100 });
  assert.equal(empty, '');
});

test('filterWhiteboardNodes filters correctly by category and query', () => {
  // Category filter
  const aimlNodes = filterWhiteboardNodes(mockNodes, 'aiml', '');
  assert.equal(aimlNodes.length, 2);

  // Search filter
  const pyResults = filterWhiteboardNodes(mockNodes, 'all', 'python');
  assert.equal(pyResults.length, 1);
  assert.equal(pyResults[0].id, 'python');

  // Combined
  const none = filterWhiteboardNodes(mockNodes, 'web', 'numpy');
  assert.equal(none.length, 0);
});

test('calculateProficiencyStats aggregates counts accurately', () => {
  const stats = calculateProficiencyStats(mockNodes);
  assert.deepEqual(stats, {
    proficient: 2,
    working: 1,
    learning: 1,
    total: 4,
  });
});

test('resetNodePositions generates correct default map', () => {
  const resetMap = resetNodePositions(mockNodes);
  assert.deepEqual(resetMap['python'], { x: 100, y: 100 });
  assert.deepEqual(resetMap['numpy'], { x: 300, y: 120 });
});

test('updateFloatingPhysics dampens velocities and bounces off boundaries', () => {
  const bounds = { width: 800, height: 600 };
  const initial: FloatingTechPhysics = {
    x: 790,
    y: 300,
    vx: 15,
    vy: 0,
    rotation: 0,
    vRot: 0.05,
    radius: 30,
  };

  const updated = updateFloatingPhysics(initial, bounds, 0.9, 0.8);
  // Boundary overflow on right edge: x + radius > 800 -> should bounce left
  assert.ok(updated.vx < 0, 'Velocity should reverse after hitting right boundary');
  assert.ok(updated.x <= bounds.width - initial.radius, 'Position should be clamped within bounds');
});

test('calculateScatterImpulse generates non-zero radial force away from center', () => {
  const center = { x: 400, y: 300 };
  const point = { x: 500, y: 300 }; // directly to the right
  const impulse = calculateScatterImpulse(point, center, 10);
  assert.ok(impulse.x > 5, 'Impulse should push strongly to the right');
});


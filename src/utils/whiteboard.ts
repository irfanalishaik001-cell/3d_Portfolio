/**
 * Pure utility functions for the interactive whiteboard canvas,
 * node clustering, layout calculations, and connection paths.
 */

export interface WhiteboardNode {
  id: string;
  name: string;
  category: 'programming' | 'aiml' | 'tools' | 'web' | 'cs' | 'creative';
  proficiency: 'Proficient' | 'Working Knowledge' | 'Currently Learning';
  x: number; // percentage or px coordinate on canvas
  y: number;
  icon: string;
  color: string;
  accentBg: string;
  description: string;
  docUrl: string;
  relatedIds: string[];
  tag?: string;
}

export interface CanvasPoint {
  x: number;
  y: number;
}

export interface CanvasBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Clamps coordinates within canvas boundaries with optional margin.
 */
export function clampCoordinates(
  point: CanvasPoint,
  bounds: CanvasBounds,
  nodeWidth = 140,
  nodeHeight = 56
): CanvasPoint {
  const safeMinX = bounds.minX;
  const safeMaxX = Math.max(bounds.minX, bounds.maxX - nodeWidth);
  const safeMinY = bounds.minY;
  const safeMaxY = Math.max(bounds.minY, bounds.maxY - nodeHeight);

  return {
    x: Math.min(Math.max(point.x, safeMinX), safeMaxX),
    y: Math.min(Math.max(point.y, safeMinY), safeMaxY),
  };
}

/**
 * Generates an SVG cubic bezier curve path string connecting two nodes.
 */
export function generateCurvedConnectionPath(
  start: CanvasPoint,
  end: CanvasPoint,
  curvature = 0.35
): string {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return '';

  const cx1 = start.x + dx * curvature;
  const cy1 = start.y + dy * 0.1;
  const cx2 = start.x + dx * (1 - curvature);
  const cy2 = end.y - dy * 0.1;

  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

/**
 * Filter nodes by search query and category.
 */
export function filterWhiteboardNodes(
  nodes: WhiteboardNode[],
  categoryFilter: string,
  searchQuery: string
): WhiteboardNode[] {
  const query = searchQuery.trim().toLowerCase();

  return nodes.filter((node) => {
    const matchesCategory =
      categoryFilter === 'all' || node.category === categoryFilter;
    const matchesSearch =
      query === '' ||
      node.name.toLowerCase().includes(query) ||
      node.description.toLowerCase().includes(query) ||
      node.proficiency.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Calculate proficiency breakdown counts.
 */
export function calculateProficiencyStats(nodes: WhiteboardNode[]): {
  proficient: number;
  working: number;
  learning: number;
  total: number;
} {
  let proficient = 0;
  let working = 0;
  let learning = 0;

  for (const node of nodes) {
    if (node.proficiency === 'Proficient') proficient++;
    else if (node.proficiency === 'Working Knowledge') working++;
    else if (node.proficiency === 'Currently Learning') learning++;
  }

  return {
    proficient,
    working,
    learning,
    total: nodes.length,
  };
}

/**
 * Reset layout offsets to default positions.
 */
export function resetNodePositions(
  initialNodes: WhiteboardNode[]
): Record<string, CanvasPoint> {
  const positions: Record<string, CanvasPoint> = {};
  for (const node of initialNodes) {
    positions[node.id] = { x: node.x, y: node.y };
  }
  return positions;
}

export interface FloatingTechPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  radius: number;
}

/**
 * Updates floating tech stack positions and handles boundary reflections.
 */
export function updateFloatingPhysics(
  item: FloatingTechPhysics,
  bounds: { width: number; height: number },
  damping = 0.992,
  restitution = 0.85
): FloatingTechPhysics {
  let { x, y, vx, vy, rotation, vRot, radius } = item;

  x += vx;
  y += vy;
  rotation += vRot;
  vx *= damping;
  vy *= damping;

  // Boundary checks with bounce
  if (x - radius < 0) {
    x = radius;
    vx = Math.abs(vx) * restitution;
  } else if (x + radius > bounds.width) {
    x = bounds.width - radius;
    vx = -Math.abs(vx) * restitution;
  }

  if (y - radius < 0) {
    y = radius;
    vy = Math.abs(vy) * restitution;
  } else if (y + radius > bounds.height) {
    y = bounds.height - radius;
    vy = -Math.abs(vy) * restitution;
  }

  return { x, y, vx, vy, rotation, vRot, radius };
}

/**
 * Calculates radial impulse for scattering floating tech items.
 */
export function calculateScatterImpulse(
  currentPos: CanvasPoint,
  center: CanvasPoint,
  force = 12
): CanvasPoint {
  const dx = currentPos.x - center.x;
  const dy = currentPos.y - center.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;

  return {
    x: (dx / dist) * force + (Math.random() - 0.5) * 3,
    y: (dy / dist) * force + (Math.random() - 0.5) * 3,
  };
}


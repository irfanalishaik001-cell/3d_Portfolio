import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_WHITEBOARD_NODES } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import {
  FloatingTechPhysics,
  updateFloatingPhysics,
  calculateScatterImpulse,
  WhiteboardNode,
} from '../utils/whiteboard';
import { NodeDetailModal } from './NodeDetailModal';
import {
  Sparkles,
  Compass,
  RotateCcw,
  Zap,
  Radio,
  Sliders,
  Move,
  Info,
} from 'lucide-react';
import { DoodleSparkle } from './DoodleDecorations';

interface ActiveFloatingItem extends FloatingTechPhysics {
  node: WhiteboardNode;
  id: string;
  isDragging?: boolean;
}

export const FreeSpaceTechStacks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ActiveFloatingItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<WhiteboardNode | null>(null);
  const [gravityMode, setGravityMode] = useState<'zero-g' | 'vortex' | 'calm'>('zero-g');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const requestRef = useRef<number>(0);
  const itemsRef = useRef<ActiveFloatingItem[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const draggedItemRef = useRef<{
    id: string;
    pointerX: number;
    pointerY: number;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
  } | null>(null);

  // Initialize random free-space positions and velocities
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1000;
    const height = 480;

    const initialItems: ActiveFloatingItem[] = INITIAL_WHITEBOARD_NODES.map((node, index) => {
      // Distribute evenly with random velocity
      const col = index % 5;
      const row = Math.floor(index / 5);
      const x = 80 + col * ((width - 160) / 4) + (Math.random() - 0.5) * 60;
      const y = 60 + row * ((height - 120) / 3) + (Math.random() - 0.5) * 40;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.8;

      return {
        id: node.id,
        node,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: (Math.random() - 0.5) * 12,
        vRot: (Math.random() - 0.5) * 0.015,
        radius: 46,
      };
    });

    itemsRef.current = initialItems;
    setItems([...initialItems]);
  }, []);

  // Main physics simulation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const container = containerRef.current;
      const width = container?.clientWidth || 1000;
      const height = container?.clientHeight || 480;
      const bounds = { width, height };

      const centerX = width / 2;
      const centerY = height / 2;

      const updated = itemsRef.current.map((item) => {
        // If being dragged, directly track pointer
        if (draggedItemRef.current && draggedItemRef.current.id === item.id) {
          return item;
        }

        let { x, y, vx, vy, rotation, vRot, radius, node } = item;

        // Apply mode forces
        if (gravityMode === 'vortex') {
          // Inward vortex pull
          const dx = centerX - x;
          const dy = centerY - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const pull = 0.08 * speedMultiplier;
          vx += (dx / dist) * pull;
          vy += (dy / dist) * pull;
          // Orthogonal swirl
          vx += (-dy / dist) * pull * 0.7;
          vy += (dx / dist) * pull * 0.7;
        } else if (gravityMode === 'zero-g') {
          // Maintain constant low ambient drift
          const currentSpeed = Math.sqrt(vx * vx + vy * vy);
          const targetSpeed = 0.65 * speedMultiplier;
          if (currentSpeed < 0.2) {
            vx += (Math.random() - 0.5) * 0.5;
            vy += (Math.random() - 0.5) * 0.5;
          } else if (currentSpeed > targetSpeed * 2) {
            vx *= 0.98;
            vy *= 0.98;
          }
        }

        // Mouse repulsion effect
        if (mousePosRef.current.active) {
          const mdx = x - mousePosRef.current.x;
          const mdy = y - mousePosRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140 && mdist > 0) {
            const force = ((140 - mdist) / 140) * 1.5;
            vx += (mdx / mdist) * force;
            vy += (mdy / mdist) * force;
          }
        }

        const physicsResult = updateFloatingPhysics(
          { x, y, vx, vy, rotation, vRot, radius },
          bounds,
          0.994,
          0.88
        );

        return {
          ...physicsResult,
          id: item.id,
          node,
        };
      });

      itemsRef.current = updated;
      setItems(updated);

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gravityMode, speedMultiplier]);

  // Pointer drag and fling mechanics
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const item = itemsRef.current.find((i) => i.id === id);
    if (!item) return;

    draggedItemRef.current = {
      id,
      pointerX: e.clientX,
      pointerY: e.clientY,
      lastX: item.x,
      lastY: item.y,
      vx: 0,
      vy: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Track global mouse in arena for gentle repulsion
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }

    if (!draggedItemRef.current) return;
    e.preventDefault();

    const dx = e.clientX - draggedItemRef.current.pointerX;
    const dy = e.clientY - draggedItemRef.current.pointerY;

    const targetX = draggedItemRef.current.lastX + dx;
    const targetY = draggedItemRef.current.lastY + dy;

    // Calculate throw velocity
    const item = itemsRef.current.find((i) => i.id === draggedItemRef.current?.id);
    if (item) {
      const vx = (targetX - item.x) * 0.6;
      const vy = (targetY - item.y) * 0.6;
      draggedItemRef.current.vx = vx;
      draggedItemRef.current.vy = vy;

      item.x = targetX;
      item.y = targetY;
      item.vx = vx;
      item.vy = vy;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggedItemRef.current) {
      const item = itemsRef.current.find((i) => i.id === draggedItemRef.current?.id);
      if (item) {
        // Release with fling momentum
        item.vx = Math.max(-14, Math.min(14, draggedItemRef.current.vx));
        item.vy = Math.max(-14, Math.min(14, draggedItemRef.current.vy));
        item.vRot = (Math.random() - 0.5) * 0.08;
      }
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      draggedItemRef.current = null;
    }
  };

  // Scatter all items outward with explosion force
  const handleScatter = () => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 480;
    const center = { x: width / 2, y: height / 2 };

    itemsRef.current = itemsRef.current.map((item) => {
      const impulse = calculateScatterImpulse({ x: item.x, y: item.y }, center, 14);
      return {
        ...item,
        vx: impulse.x,
        vy: impulse.y,
        vRot: (Math.random() - 0.5) * 0.12,
      };
    });
  };

  // Recall items toward orbital center
  const handleRecall = () => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 480;
    const center = { x: width / 2, y: height / 2 };

    itemsRef.current = itemsRef.current.map((item) => {
      const dx = center.x - item.x;
      const dy = center.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      return {
        ...item,
        vx: (dx / dist) * 7,
        vy: (dy / dist) * 7,
      };
    });
  };

  return (
    <section
      id="free-space-tech"
      className="relative py-20 bg-gradient-to-b from-[#fafafa] via-white to-blue-50/20 border-t border-stone-200/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold mb-3 font-mono">
              <Radio size={13} className="text-indigo-600 animate-pulse" />
              <span>Zero-Gravity Playground</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              Free-Space Technology Nebula
              <DoodleSparkle size={20} className="text-amber-400 hidden sm:inline-block" />
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Drifting, physical tech stack badges floating across free space. Grab, fling, or scatter them to explore the ecosystem in motion.
            </p>
          </div>

          {/* Interactive Playground Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-white/90 p-2 rounded-2xl border border-stone-200/80 shadow-xs self-start md:self-auto backdrop-blur-md">
            
            {/* Gravity Mode Selector */}
            <div className="flex bg-stone-100/90 rounded-xl p-1 text-xs font-medium">
              <button
                onClick={() => setGravityMode('zero-g')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  gravityMode === 'zero-g'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Zero-G Drift
              </button>
              <button
                onClick={() => setGravityMode('vortex')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  gravityMode === 'vortex'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Vortex Orbit
              </button>
            </div>

            {/* Scatter Supernova Action */}
            <button
              onClick={handleScatter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Zap size={13} className="text-amber-400" />
              <span>Scatter All</span>
            </button>

            {/* Recall Action */}
            <button
              onClick={handleRecall}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
              title="Recall badges to center"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Recall</span>
            </button>
          </div>
        </div>

        {/* Free Space Arena Canvas */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            mousePosRef.current.active = false;
            if (draggedItemRef.current) handlePointerUp({} as any);
          }}
          className="relative w-full h-[480px] rounded-3xl border border-stone-200/90 bg-radial from-white via-[#fcfcfd] to-stone-50 shadow-inner overflow-hidden select-none cursor-crosshair"
          style={{ touchAction: 'none' }}
        >
          {/* Subtle Ambient Cosmic Particles / Guide Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.28]"
            style={{
              backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Floating Subtle Direction Hint */}
          <div className="absolute top-4 left-5 pointer-events-none text-xs text-stone-400 font-mono flex items-center gap-2">
            <Move size={13} className="text-stone-400" />
            <span>Interactive physics: Grab and throw any tech badge</span>
          </div>

          {/* Render All Floating Technology Badges */}
          {items.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`${item.node.name} floating in free space. Grab to fling or press Enter to inspect.`}
              onPointerDown={(e) => handlePointerDown(item.id, e)}
              onClick={() => setSelectedNode(item.node)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedNode(item.node);
              }}
              style={{
                transform: `translate3d(${item.x - item.radius}px, ${item.y - 20}px, 0) rotate(${item.rotation}rad)`,
                touchAction: 'none',
              }}
              className="absolute cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-shadow duration-100 group"
            >
              <div
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-200/90 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group-hover:scale-105"
                style={{
                  boxShadow: `0 4px 16px -2px ${item.node.color}15`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-stone-200/50"
                  style={{ backgroundColor: item.node.accentBg }}
                >
                  <TechIcon name={item.node.icon} size={15} />
                </div>
                <span className="text-xs font-bold text-stone-800 tracking-tight whitespace-nowrap">
                  {item.node.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.node.color }} />
              </div>
            </div>
          ))}

          {/* Bottom Bar Info */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-stone-400 pointer-events-none">
            <span>{items.length} Technology Entities Active</span>
            <span className="hidden sm:inline">Mode: {gravityMode} • Velocity Damping: 0.994</span>
          </div>
        </div>

      </div>

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSelectNode={(nodeId) => {
          const found = INITIAL_WHITEBOARD_NODES.find((n) => n.id === nodeId);
          if (found) setSelectedNode(found);
        }}
      />
    </section>
  );
};

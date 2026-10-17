import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  INITIAL_WHITEBOARD_NODES,
  PERSONAL_INFO,
} from '../data/portfolioData';
import {
  WhiteboardNode,
  CanvasPoint,
  generateCurvedConnectionPath,
  clampCoordinates,
  resetNodePositions,
  filterWhiteboardNodes,
  calculateProficiencyStats,
} from '../utils/whiteboard';
import { WhiteboardNodeCard } from './WhiteboardNodeCard';
import { NodeDetailModal } from './NodeDetailModal';
import {
  WhiteboardGridBackground,
  DoodleArrow,
  DoodleSparkle,
} from './DoodleDecorations';
import {
  RotateCcw,
  Search,
  ZoomIn,
  ZoomOut,
  MousePointer,
  Sparkles,
  Info,
} from 'lucide-react';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 560;

export const WhiteboardCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<WhiteboardNode[]>(INITIAL_WHITEBOARD_NODES);
  const [positions, setPositions] = useState<Record<string, CanvasPoint>>(() =>
    resetNodePositions(INITIAL_WHITEBOARD_NODES)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNode, setActiveNode] = useState<WhiteboardNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return filterWhiteboardNodes(nodes, selectedCategory, searchQuery);
  }, [nodes, selectedCategory, searchQuery]);

  // Proficiency statistics
  const stats = useMemo(() => calculateProficiencyStats(nodes), [nodes]);

  // Handle position change with clamping
  const handlePositionChange = useCallback(
    (id: string, newPos: CanvasPoint) => {
      const clamped = clampCoordinates(
        newPos,
        { minX: 10, maxX: CANVAS_WIDTH, minY: 10, maxY: CANVAS_HEIGHT },
        180,
        60
      );
      setPositions((prev) => ({
        ...prev,
        [id]: clamped,
      }));
    },
    []
  );

  // Reset positions to default
  const handleResetLayout = () => {
    setPositions(resetNodePositions(INITIAL_WHITEBOARD_NODES));
    setZoomLevel(1);
  };

  // Node selection for deep-dive inspection
  const handleSelectNode = (node: WhiteboardNode) => {
    setActiveNode(node);
  };

  const handleSelectNodeById = (nodeId: string) => {
    const found = nodes.find((n) => n.id === nodeId);
    if (found) setActiveNode(found);
  };

  // SVG Connections between related nodes
  const connectionPaths = useMemo(() => {
    const paths: Array<{ id: string; d: string; color: string }> = [];

    nodes.forEach((node) => {
      const startPos = positions[node.id];
      if (!startPos) return;

      node.relatedIds.forEach((relId) => {
        if (node.id > relId && nodes.find((n) => n.id === relId)?.relatedIds.includes(node.id)) {
          return;
        }

        const endPos = positions[relId];
        if (!endPos) return;

        const startPoint: CanvasPoint = {
          x: startPos.x + 90,
          y: startPos.y + 24,
        };
        const endPoint: CanvasPoint = {
          x: endPos.x + 90,
          y: endPos.y + 24,
        };

        const d = generateCurvedConnectionPath(startPoint, endPoint);
        if (d) {
          paths.push({
            id: `${node.id}-${relId}`,
            d,
            color: node.color,
          });
        }
      });
    });

    return paths;
  }, [nodes, positions]);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'aiml', label: 'AI & Data Science' },
    { id: 'programming', label: 'Languages' },
    { id: 'cs', label: 'CS Core' },
    { id: 'tools', label: 'Dev Tools' },
    { id: 'web', label: 'Web Dev' },
    { id: 'creative', label: 'Creative Suite' },
  ];

  return (
    <section id="whiteboard" className="relative py-16 md:py-24 bg-[#fafafa] border-y border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3">
              <Sparkles size={13} />
              <span>Interactive Digital Workspace</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-3">
              The Technology Whiteboard
              <DoodleSparkle size={24} className="text-amber-400 hidden sm:inline-block" />
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Drag, explore, and inspect the tools, mathematical packages, and systems powering my engineering practice. Click any node to review official documentation and linked projects.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs bg-white/90 p-2.5 rounded-xl border border-stone-200/80 shadow-xs self-start md:self-auto font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {stats.proficient} Proficient
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-blue-700 font-semibold">
              {stats.working} Working Knowledge
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-amber-700 font-semibold">
              {stats.learning} Learning
            </span>
          </div>
        </div>

        {/* Toolbar: Categories + Search + Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 mb-6 bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-xs">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100/70 hover:bg-stone-200/70 text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Search, Zoom, Reset */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-52">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack (e.g., pandas)..."
                aria-label="Filter technology nodes"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Reset Layout Control */}
            <button
              onClick={handleResetLayout}
              title="Reset layout to default positions"
              aria-label="Reset whiteboard layout"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200/80 transition-colors shrink-0"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden lg:flex items-center bg-stone-100 rounded-lg border border-stone-200/80 p-0.5 shrink-0">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
                aria-label="Zoom out canvas"
                title="Zoom Out"
                className="p-1 text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors"
              >
                <ZoomOut size={13} />
              </button>
              <span className="text-[10px] font-mono px-1.5 text-stone-500">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.25, z + 0.1))}
                aria-label="Zoom in canvas"
                title="Zoom In"
                className="p-1 text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* The Whiteboard Canvas Container */}
        <div className="relative w-full rounded-3xl border border-stone-200/90 bg-white shadow-xl shadow-stone-200/50 overflow-hidden">
          
          {/* Canvas Decorative Header Tab */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-stone-50/90 border-b border-stone-200/80 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[11px] text-stone-600 font-semibold ml-2">
                workspace://irfan-stack.artboard
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px] text-stone-400 font-mono hidden sm:flex">
              <span className="flex items-center gap-1">
                <MousePointer size={11} /> Drag to rearrange
              </span>
              <span>1200 × 560 px</span>
              <span className="text-blue-600 font-medium">Click node for docs</span>
            </div>
          </div>

          {/* Canvas Scroll / Viewport Area */}
          <div
            ref={canvasRef}
            className="relative w-full overflow-x-auto overflow-y-hidden bg-[#fdfdfd] min-h-[560px] select-none"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            {/* Inner Artboard (fixed coordinate space scaled or scrolled) */}
            <div
              className="relative transition-transform duration-100 ease-out"
              style={{
                width: `${CANVAS_WIDTH}px`,
                height: `${CANVAS_HEIGHT}px`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Paper Grid Background */}
              <WhiteboardGridBackground />

              {/* Hand-Drawn Cluster Annotations & Sketch Notes */}
              <div className="absolute top-4 left-6 pointer-events-none select-none z-10">
                <span className="font-serif italic font-medium text-xs text-stone-500 tracking-wider">
                  // Programming Foundations
                </span>
              </div>

              <div className="absolute top-4 left-[340px] pointer-events-none select-none z-10 flex items-center gap-2">
                <span className="font-serif italic font-medium text-xs text-blue-600/90 tracking-wider">
                  ★ Machine Learning & Data Pipelines
                </span>
                <DoodleArrow direction="right-down" className="w-8 h-4 text-blue-400 opacity-70" />
              </div>

              <div className="absolute top-4 right-[280px] pointer-events-none select-none z-10">
                <span className="font-serif italic font-medium text-xs text-stone-500 tracking-wider">
                  // Tooling & IDE
                </span>
              </div>

              <div className="absolute bottom-5 right-[160px] pointer-events-none select-none z-10">
                <span className="font-serif italic font-medium text-xs text-rose-600/90 tracking-wider">
                  ✦ Creative Motion & Visual Craft
                </span>
              </div>

              {/* SVG Connector Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="arrowhead"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" opacity="0.6" />
                  </marker>
                </defs>

                {connectionPaths.map((path) => (
                  <path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.6"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-300"
                    opacity="0.75"
                  />
                ))}
              </svg>

              {/* Draggable Technology Cards */}
              {nodes.map((node) => {
                const pos = positions[node.id] || { x: node.x, y: node.y };
                const isMatch = filteredNodes.some((fn) => fn.id === node.id);

                return (
                  <div
                    key={node.id}
                    style={{
                      opacity: isMatch ? 1 : 0.25,
                      filter: isMatch ? 'none' : 'grayscale(80%)',
                      transition: 'opacity 0.2s ease, filter 0.2s ease',
                    }}
                  >
                    <WhiteboardNodeCard
                      node={node}
                      position={pos}
                      onPositionChange={handlePositionChange}
                      onSelect={handleSelectNode}
                      isSelected={activeNode?.id === node.id}
                      isHighlighted={Boolean(
                        searchQuery &&
                          node.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Canvas Footer Hint */}
          <div className="px-5 py-3 bg-stone-50/70 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center gap-2 text-stone-600">
              <Info size={14} className="text-blue-600 shrink-0" />
              <span>
                Tip: Nodes are fully draggable! Click any card to see linked projects, documentation, and details.
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-stone-500">
              <span>{filteredNodes.length} of {nodes.length} visible</span>
              <button
                onClick={handleResetLayout}
                className="text-blue-600 hover:underline font-semibold"
              >
                Reset layout
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={activeNode}
        onClose={() => setActiveNode(null)}
        onSelectNode={handleSelectNodeById}
      />
    </section>
  );
};

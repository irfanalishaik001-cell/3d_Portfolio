import React, { useState, useRef, useEffect } from 'react';
import { WhiteboardNode, CanvasPoint } from '../utils/whiteboard';
import { TechIcon } from './TechIcons';
import { GripHorizontal } from 'lucide-react';

interface WhiteboardNodeCardProps {
  node: WhiteboardNode;
  position: CanvasPoint;
  onPositionChange: (id: string, newPos: CanvasPoint) => void;
  onSelect: (node: WhiteboardNode) => void;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export const WhiteboardNodeCard: React.FC<WhiteboardNodeCardProps> = ({
  node,
  position,
  onPositionChange,
  onSelect,
  isSelected = false,
  isHighlighted = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; nodeX: number; nodeY: number }>({
    pointerX: 0,
    pointerY: 0,
    nodeX: 0,
    nodeY: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setIsDragging(true);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      nodeX: position.x,
      nodeY: position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;

    onPositionChange(node.id, {
      x: dragStartRef.current.nodeX + dx,
      y: dragStartRef.current.nodeY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      setIsDragging(false);
    }
  };

  // Keyboard navigation for moving nodes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 25 : 8;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onPositionChange(node.id, { x: position.x, y: position.y - step });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onPositionChange(node.id, { x: position.x, y: position.y + step });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPositionChange(node.id, { x: position.x - step, y: position.y });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onPositionChange(node.id, { x: position.x + step, y: position.y });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(node);
    }
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`${node.name} technology card, ${node.proficiency}. Press Enter to view details or arrow keys to reposition.`}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // If not dragged significantly, open detail
        onSelect(node);
      }}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: 'none',
      }}
      className={`absolute select-none cursor-grab active:cursor-grabbing transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl group ${
        isDragging ? 'z-40 scale-105 shadow-xl rotate-1' : isHovered ? 'z-30 shadow-md -translate-y-0.5' : 'z-20 shadow-xs'
      }`}
    >
      {/* Node Body Card */}
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border backdrop-blur-md transition-all ${
          isSelected
            ? 'bg-blue-50/95 border-blue-500 shadow-md ring-2 ring-blue-500/20'
            : isHighlighted
            ? 'bg-amber-50/95 border-amber-400 shadow-md ring-2 ring-amber-400/20'
            : 'bg-white/85 border-stone-200/80 hover:border-stone-300 hover:bg-white'
        }`}
      >
        {/* Drag handle dots */}
        <div className="text-stone-300 group-hover:text-stone-400 transition-colors">
          <GripHorizontal size={13} />
        </div>

        {/* Tech Icon */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-stone-200/50"
          style={{ backgroundColor: node.accentBg }}
        >
          <TechIcon name={node.icon} size={18} />
        </div>

        {/* Title and Tag */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-800 tracking-tight whitespace-nowrap">
              {node.name}
            </span>
            {node.tag && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-stone-100 text-stone-600 border border-stone-200/60 uppercase tracking-wider">
                {node.tag}
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-400 font-mono tracking-wide capitalize">
            {node.proficiency}
          </span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {isHovered && !isDragging && (
        <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full w-56 p-2.5 bg-stone-900/90 text-white backdrop-blur-md rounded-lg shadow-xl text-[11px] pointer-events-none z-50 animate-in fade-in duration-150">
          <div className="font-semibold text-white flex items-center justify-between mb-1">
            <span>{node.name}</span>
            <span className="text-[10px] text-blue-300 uppercase tracking-wider font-mono">
              {node.category}
            </span>
          </div>
          <p className="text-stone-300 line-clamp-2 leading-relaxed font-sans">
            {node.description}
          </p>
          <div className="mt-1.5 pt-1.5 border-t border-stone-700/60 text-[10px] text-stone-400 flex items-center justify-between">
            <span>Click to inspect details</span>
            <span className="text-blue-400">Docs ↗</span>
          </div>
        </div>
      )}
    </div>
  );
};

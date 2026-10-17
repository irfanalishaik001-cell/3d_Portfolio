import React from 'react';
import { ExternalLink, X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { WhiteboardNode } from '../utils/whiteboard';
import { TechIcon } from './TechIcons';
import { PROJECTS } from '../data/portfolioData';

interface NodeDetailModalProps {
  node: WhiteboardNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  onSelectNode,
}) => {
  if (!node) return null;

  const relatedProjects = PROJECTS.filter((p) =>
    p.technologies.some((tech) =>
      tech.toLowerCase().includes(node.name.toLowerCase()) ||
      node.name.toLowerCase().includes(tech.toLowerCase())
    )
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="node-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200/80 p-6 md:p-8 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative color bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: node.color }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close technology details"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xs border border-stone-200/60 shrink-0"
            style={{ backgroundColor: node.accentBg }}
          >
            <TechIcon name={node.icon} size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 id="node-modal-title" className="text-xl font-bold text-stone-900">
                {node.name}
              </h3>
              {node.tag && (
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  {node.tag}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="capitalize">{node.category}</span>
              <span>•</span>
              <span
                className={`font-semibold ${
                  node.proficiency === 'Proficient'
                    ? 'text-emerald-700'
                    : node.proficiency === 'Working Knowledge'
                    ? 'text-blue-700'
                    : 'text-amber-700'
                }`}
              >
                {node.proficiency}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 text-sm leading-relaxed text-stone-600 bg-stone-50/80 rounded-xl p-4 border border-stone-200/50">
          {node.description}
        </div>

        {/* Applied In Projects */}
        {relatedProjects.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
              <Layers size={13} />
              Featured In Projects
            </h4>
            <div className="space-y-2">
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200/70 bg-white hover:bg-stone-50 text-xs transition-colors"
                >
                  <span className="font-semibold text-stone-800">{p.title}</span>
                  <span className="text-stone-500 text-[11px]">{p.tagline.slice(0, 45)}...</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Stack Nodes */}
        {node.relatedIds.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
              <Sparkles size={13} />
              Connected Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {node.relatedIds.map((relId) => (
                <button
                  key={relId}
                  onClick={() => onSelectNode(relId)}
                  className="px-3 py-1 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md border border-stone-200 transition-colors"
                >
                  {relId}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 text-xs">
          <span className="text-stone-400 flex items-center gap-1">
            <BookOpen size={13} />
            Verified Documentation
          </span>
          <a
            href={node.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            Open Official Docs
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

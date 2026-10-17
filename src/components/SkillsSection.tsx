import React, { useState } from 'react';
import { INITIAL_WHITEBOARD_NODES } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { Sparkles, Compass, CheckCircle2, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { NodeDetailModal } from './NodeDetailModal';
import { WhiteboardNode } from '../utils/whiteboard';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'aiml' | 'programming' | 'cs' | 'creative'>('all');
  const [selectedNode, setSelectedNode] = useState<WhiteboardNode | null>(null);

  const filteredSkills = INITIAL_WHITEBOARD_NODES.filter(
    (node) => activeTab === 'all' || node.category === activeTab
  );

  const currentlyLearning = [
    {
      title: 'Deep Neural Architectures & PyTorch',
      description: 'Convolutional neural networks (CNNs), attention mechanisms, and backpropagation gradients.',
      resource: 'Deep Learning Specialization & PyTorch Docs',
      badge: 'Active Study',
    },
    {
      title: 'MLOps & Model Lifecycle Tracking',
      description: 'Model containerization, continuous evaluation, drift detection, and MLflow/Docker integrations.',
      resource: 'EduSkills AICTE Capstone Module',
      badge: 'Internship Track',
    },
    {
      title: 'Advanced System Design & Scalable APIs',
      description: 'Microservices architecture, caching with Redis, message queues, and high-concurrency database design.',
      resource: 'Distributed Systems & OOP',
      badge: 'Engineering Prep',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Domains' },
    { id: 'aiml', label: 'AI & Data Science' },
    { id: 'programming', label: 'Core Languages' },
    { id: 'cs', label: 'CS Fundamentals' },
    { id: 'creative', label: 'Creative Tech' },
  ];

  return (
    <section id="skills" className="py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/70 text-stone-700 text-xs font-semibold mb-3 font-mono">
              <Compass size={13} className="text-blue-600" />
              <span>Competencies & Knowledge Matrix</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Technical Skill Hierarchy
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Structured into transparent, honest proficiency tiers. No arbitrary percentages — only practical application in coursework, hackathons, and virtual internship pipelines.
            </p>
          </div>

          {/* Domain Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/80 rounded-xl border border-stone-200/70 overflow-x-auto self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedNode(skill)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNode(skill);
                }
              }}
              className="group p-5 rounded-2xl border border-stone-200/80 bg-[#fafafa] hover:bg-white hover:border-stone-300 hover:shadow-md transition-all text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon, Name, Proficiency Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-stone-200/60 shadow-xs shrink-0"
                      style={{ backgroundColor: skill.accentBg }}
                    >
                      <TechIcon name={skill.icon} size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] text-stone-500 font-mono capitalize">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                      skill.proficiency === 'Proficient'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : skill.proficiency === 'Working Knowledge'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {skill.proficiency}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                  {skill.description}
                </p>
              </div>

              {/* Card Footer: Connected links / actions */}
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span className="text-stone-400 group-hover:text-stone-600 transition-colors">
                  {skill.relatedIds.length > 0 ? `${skill.relatedIds.length} connected tools` : 'Core tool'}
                </span>
                <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated "Currently Learning" Section */}
        <div className="rounded-3xl bg-gradient-to-br from-stone-50 via-white to-blue-50/30 border border-stone-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              Currently Learning & Active Growth Radar
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mb-6">
            Disciplined continuous learning: areas where I am actively studying theory, reading research publications, and implementing foundational code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentlyLearning.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.badge}
                    </span>
                    <Sparkles size={12} className="text-amber-500" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-400">
                  Focus: {item.resource}
                </div>
              </div>
            ))}
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

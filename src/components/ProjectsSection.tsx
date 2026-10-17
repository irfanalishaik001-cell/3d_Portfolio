import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import {
  ExternalLink,
  Github,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  TrendingUp,
  Users,
  CheckCircle,
} from 'lucide-react';
import { DoodleSparkle, DoodleUnderline } from './DoodleDecorations';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [simulatedCrop, setSimulatedCrop] = useState<'Tomatoes' | 'Soybeans' | 'Corn'>('Tomatoes');

  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#fafafa] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3 font-mono">
              <Layers size={13} />
              <span>Engineered Solutions & Hackathons</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              Featured Projects
              <DoodleSparkle size={22} className="text-amber-400 hidden sm:inline-block" />
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Real problem statements addressed through data preprocessing, machine learning algorithms, and functional web applications.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500 self-start md:self-auto">
            <span>Portfolio Codebase • Verified Projects</span>
          </div>
        </div>

        {/* Featured Showcase: FarmDirect AI */}
        <div className="mb-16 rounded-3xl bg-white border border-stone-200/90 shadow-xl overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 relative bg-stone-100 min-h-[320px] lg:min-h-[460px] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent lg:hidden" />
              
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-stone-900 text-xs font-bold shadow-md">
                <Award size={14} className="text-amber-500" />
                <span>{featured.recognition}</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-700 font-semibold">
                  <span>{featured.category}</span>
                  <span>•</span>
                  <span>Featured Build</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                  {featured.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-500 font-medium mb-4">
                  {featured.tagline}
                </p>

                {/* Problem & Solution Callout */}
                <div className="space-y-3 mb-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-900 block mb-1">
                      Problem Statement:
                    </span>
                    <p className="text-rose-950 text-xs leading-relaxed">
                      {featured.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">
                      Machine Learning Solution:
                    </span>
                    <p className="text-emerald-950 text-xs leading-relaxed">
                      {featured.solution}
                    </p>
                  </div>
                </div>

                {/* My Contributions */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Key Contributions:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {featured.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featured.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors shadow-xs"
                >
                  <TrendingUp size={14} />
                  <span>Interactive Price Model Demo</span>
                </button>

                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors border border-stone-200/70"
                >
                  <Github size={14} />
                  <span>Repository</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedProject(project);
              }}
              className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs hover:shadow-lg hover:border-stone-300 transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/70">
                    {project.category}
                  </span>
                  {project.recognition && (
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {project.recognition}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 group-hover:text-blue-600 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-stone-500 mb-4 line-clamp-2">
                  {project.tagline}
                </p>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 mb-4 text-xs text-stone-600 line-clamp-3">
                  <strong className="text-stone-800">Problem:</strong> {project.problem}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-stone-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>View Full Architecture</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive FarmDirect Demo Simulator Modal */}
      {demoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-base text-stone-900">
                  FarmDirect AI — Price Forecasting Simulation
                </h3>
              </div>
              <button
                onClick={() => setDemoOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              This interactive widget demonstrates FarmDirect AI's predictive mandi price estimation algorithm benchmarked against exploitative intermediary wholesale markups.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-stone-700">Select Produce:</span>
              {(['Tomatoes', 'Soybeans', 'Corn'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSimulatedCrop(crop)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    simulatedCrop === crop
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>

            {/* Simulation Comparison Card */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/80 mb-4 text-center">
              <div className="p-3 bg-white rounded-lg border border-rose-200 shadow-xs">
                <span className="text-[10px] font-mono font-bold text-rose-600 block uppercase">
                  Traditional Intermediary Mandi
                </span>
                <span className="text-xl font-extrabold text-stone-800 block my-1">
                  {simulatedCrop === 'Tomatoes' ? '$2.80 / kg' : simulatedCrop === 'Soybeans' ? '$3.90 / kg' : '$3.20 / kg'}
                </span>
                <span className="text-[10px] text-stone-400">
                  Farmer receives ~60% of consumer spend
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-emerald-300 shadow-xs ring-1 ring-emerald-400/30">
                <span className="text-[10px] font-mono font-bold text-emerald-600 block uppercase">
                  FarmDirect AI Direct Fair Price
                </span>
                <span className="text-xl font-extrabold text-emerald-700 block my-1">
                  {simulatedCrop === 'Tomatoes' ? '$4.50 / kg' : simulatedCrop === 'Soybeans' ? '$5.85 / kg' : '$5.00 / kg'}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  +38% higher farmer margin retained
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-stone-500 bg-blue-50/70 p-3 rounded-lg border border-blue-100">
              Model inputs: Rainfall anomaly index (+4.2%), wholesale mandi supply velocity (680 metric tons), and localized consumer demand curve.
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setDemoOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-stone-900 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono text-blue-600 font-semibold uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-stone-900 mt-0.5">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {selectedProject.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600">
              <div>
                <strong className="text-stone-900 block mb-1">Problem & Impact:</strong>
                <p className="leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block mb-1">System Architecture & Solution:</strong>
                <p className="leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block mb-1">Individual Contributions:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProject.contributions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-stone-900 block mb-1">Tech Stack:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-stone-100 rounded text-xs font-mono text-stone-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-blue-600"
              >
                <Github size={14} />
                <span>View GitHub Repository</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

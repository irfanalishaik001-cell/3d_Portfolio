import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  GraduationCap,
  Sparkles,
  Heart,
  Video,
  Code2,
  Cpu,
  Compass,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import {
  DoodleSparkle,
  DoodleUnderline,
  DoodleHighlightCircle,
} from './DoodleDecorations';

export const AboutSection: React.FC = () => {
  const milestones = [
    {
      year: '2023 - Present',
      title: 'B.Tech in Artificial Intelligence & Machine Learning',
      place: 'Sagi Ramakrishnam Raju Engineering College (SRKR)',
      description:
        'Focusing on Data Structures & Algorithms, Object-Oriented Programming (Java), Probability & Statistics for Data Science, and core Machine Learning theory.',
    },
    {
      year: 'Oct - Dec 2026',
      title: 'Machine Learning & Data Science Virtual Intern',
      place: 'AICTE – EduSkills Foundation',
      description:
        'Engaged in an 8-week intensive program mastering exploratory data analysis with Pandas, supervised regression, NLP classification, and Flask API deployment.',
    },
    {
      year: 'Hackathons & Builds',
      title: 'Project Lead — FarmDirect AI',
      place: 'University Innovation Hackathon',
      description:
        'Engineered an ML-driven predictive agricultural supply-chain application removing middlemen markups for regional crop growers.',
    },
  ];

  const personalInterests = [
    {
      icon: <Code2 size={16} className="text-blue-600" />,
      label: 'Algorithmic Problem Solving',
      detail: 'Consistent practice on LeetCode focusing on arrays, binary search, recursion, and dynamic programming.',
    },
    {
      icon: <Cpu size={16} className="text-purple-600" />,
      label: 'Applied AI & Data Science',
      detail: 'Experimenting with clean feature engineering, text classification pipelines, and reproducible model evaluation.',
    },
    {
      icon: <Video size={16} className="text-rose-600" />,
      label: 'Creative Video Editing',
      detail: 'Video production, color grading in DaVinci Resolve, dynamic typography, and pacing for technical explainers.',
    },
    {
      icon: <Compass size={16} className="text-emerald-600" />,
      label: 'Collaborative Engineering',
      detail: 'Thriving in hackathon environments, git-based team branching, and building products with measurable societal impact.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#fafafa] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-3 font-mono">
            <Sparkles size={13} className="text-amber-500" />
            <span>Identity & Philosophy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            About Irfan Ali Shaik
            <DoodleSparkle size={20} className="text-amber-400 hidden sm:inline-block" />
          </h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base leading-relaxed">
            I am driven by the belief that software should be fundamentally useful, mathematically grounded, and crafted with aesthetic care.
          </p>
        </div>

        {/* Two-Column Grid: Journey & Education / Interests & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Milestones Timeline (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" />
              <span>Academic Pathway & Key Milestones</span>
            </h3>

            <div className="relative border-l-2 border-stone-200 pl-6 ml-3 space-y-8">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Dot */}
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform" />
                  
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block mb-1">
                    {m.year}
                  </span>
                  
                  <h4 className="text-base font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                    {m.title}
                  </h4>
                  
                  <p className="text-xs font-medium text-stone-500 mb-2">
                    {m.place}
                  </p>
                  
                  <p className="text-xs text-stone-600 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-xs">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Creative Craft & Core Interests (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Heart size={18} className="text-rose-500" />
              <span>Craft, Code & Creative Direction</span>
            </h3>

            <div className="space-y-3">
              {personalInterests.map((interest, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
                      {interest.icon}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                      {interest.label}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-9">
                    {interest.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote / Editorial Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 via-white to-amber-50/40 border border-stone-200/80 relative">
              <span className="font-serif text-3xl text-stone-300 block -mb-2">“</span>
              <p className="font-serif italic text-xs sm:text-sm text-stone-800 leading-relaxed">
                Great software development isn't just about passing test cases; it's about solving real human pain points with clean abstractions, ethical responsibility, and relentless curiosity.
              </p>
              <span className="text-[11px] font-mono font-bold text-stone-500 block mt-3">
                — Irfan Ali Shaik
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

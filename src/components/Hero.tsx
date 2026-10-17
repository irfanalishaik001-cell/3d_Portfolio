import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  DoodleUnderline,
  DoodleSparkle,
  DoodleArrow,
  DoodleHighlightCircle,
} from './DoodleDecorations';
import { ArrowDown, Mail, FileText, Sparkles, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

import { PhotoParticleGlobe } from './PhotoParticleGlobe';

export const Hero: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(PERSONAL_INFO.availableForWork);
  const [isGlobeActive, setIsGlobeActive] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-blue-50/40 via-white to-[#fafafa]">
      
      {/* Decorative Subtle Background Art Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-emerald-400' : 'bg-stone-300'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? 'bg-emerald-500' : 'bg-stone-400'}`} />
              </span>
              <span className="text-xs font-semibold text-stone-700 tracking-tight">
                {isAvailable ? PERSONAL_INFO.availabilityText : 'Currently not open for roles'}
              </span>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                title="Toggle availability status"
                className="text-[10px] text-stone-400 hover:text-stone-700 ml-1 underline decoration-dotted"
              >
                (edit)
              </button>
            </div>

            {/* Name & Academic Identity */}
            <div className="space-y-1 mb-4">
              <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <span>✦</span>
                <span>{PERSONAL_INFO.title}</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
                I'm <span className="text-stone-900 relative inline-block">
                  {PERSONAL_INFO.name}
                  <span className="absolute -bottom-2 left-0 right-0 pointer-events-none">
                    <DoodleUnderline className="text-blue-500/80" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Primary Headline */}
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mt-2 mb-4 leading-snug">
              “Building with Code. Exploring with AI. Creating with Purpose.”
            </h2>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mb-3">
              {PERSONAL_INFO.bioParagraph1}
            </p>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xl mb-8">
              {PERSONAL_INFO.bioParagraph2}
            </p>

            {/* Actions: Explore My Work, Contact Me, Download Resume */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Primary Action 1 */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white font-semibold text-sm hover:bg-blue-600 hover:shadow-md transition-all shadow-xs"
              >
                <span>Explore My Work</span>
                <ArrowDown size={15} />
              </a>

              {/* Primary Action 2 */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300/80 text-stone-800 font-semibold text-sm hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs"
              >
                <Mail size={15} className="text-blue-600" />
                <span>Contact Me</span>
              </a>

              {/* Secondary Action: Resume */}
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 font-medium text-xs sm:text-sm transition-all"
              >
                <FileText size={15} className="text-stone-500" />
                <span>View & Download Resume</span>
              </button>
            </div>

            {/* Key Credibility Highlights */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
                  Institution
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  SRKR Engg. College
                </span>
              </div>
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
                  Internship
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  AICTE – EduSkills ML
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
                  Signature Project
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-600">
                  FarmDirect AI
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Uploaded Portrait in Frosted Frame with Hand-Drawn Cues */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* Doodle arrow pointing to portrait */}
            <div className="absolute -top-10 left-4 hidden sm:block pointer-events-none z-20">
              <span className="font-serif italic text-xs text-blue-600/90 font-medium tracking-wide block">
                Digital workspace
              </span>
              <DoodleArrow direction="right-down" className="w-16 h-8 text-blue-500/70" />
            </div>

            {/* Organic Frosted Glass Card Wrapper */}
            <div className="relative group w-full max-w-[380px]">
              
              {/* Backing layered shadow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-3xl opacity-60 blur-lg group-hover:opacity-80 transition-opacity" />

              {/* Glass Frame */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-3 shadow-xl">
                
                {/* Particle Globe & Portrait Interactive Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-900 shadow-inner">
                  <PhotoParticleGlobe
                    imageSrc="/assets/portrait.jpg"
                    onMorphStateChange={setIsGlobeActive}
                  />

                  {/* Floating Identity Badge at bottom of portrait */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-md pointer-events-none z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs text-stone-900">
                          {PERSONAL_INFO.name}
                        </h3>
                        <p className="text-[10px] text-stone-500 font-mono">
                          AIML • Software Engineer
                        </p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <CheckCircle2 size={13} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Sub-bar */}
                <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-stone-400" />
                    {PERSONAL_INFO.location}
                  </span>
                  <span className="text-blue-700 font-medium">B.Tech AI & ML</span>
                </div>

              </div>

              {/* Floating Doodle Sticky Note */}
              <div className="absolute -bottom-5 -left-6 bg-amber-50/95 border border-amber-200/90 shadow-md rounded-xl p-2.5 max-w-[190px] rotate-[-2deg] hidden sm:block">
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 mb-0.5">
                  <Sparkles size={11} className="text-amber-600" />
                  <span>Curiosity & Craft</span>
                </div>
                <p className="text-[10px] text-amber-800 leading-tight">
                  Python, Scikit-learn, DSA & video editing in DaVinci.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};

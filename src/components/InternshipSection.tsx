import React, { useState } from 'react';
import { INTERNSHIP_DETAILS, PERSONAL_INFO } from '../data/portfolioData';
import {
  FileCheck,
  ShieldCheck,
  Eye,
  EyeOff,
  Maximize2,
  Calendar,
  Building,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  ExternalLink,
  Download,
  Info,
} from 'lucide-react';
import { DoodleSparkle } from './DoodleDecorations';

export const InternshipSection: React.FC = () => {
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [privacyMask, setPrivacyMask] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [activeWeek, setActiveWeek] = useState<number>(1);

  const maskString = (str: string) => {
    if (!privacyMask) return str;
    return str.slice(0, 4) + '••••••••' + str.slice(-4);
  };

  return (
    <section id="internship" className="py-20 md:py-28 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-3 font-mono">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Official Document & Verification</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              Internship Selection & Recognition
              <DoodleSparkle size={20} className="text-amber-400 hidden sm:inline-block" />
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Official selection document for the 8-Week AICTE – EduSkills Virtual Internship Program in Machine Learning & Data Science.
            </p>
          </div>

          {/* Privacy Toggle Control */}
          <div className="flex items-center gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200 text-xs self-start md:self-auto font-mono">
            <span className="text-stone-500">Privacy Mode:</span>
            <button
              onClick={() => setPrivacyMask(!privacyMask)}
              aria-label="Toggle sensitive details masking"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                privacyMask
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {privacyMask ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{privacyMask ? 'Masked (Public Safe)' : 'Unmasked (Original)'}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Left Document Viewer / Right Curriculum & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Multi-Page Document Card (Col 7) */}
          <div className="lg:col-span-7 bg-[#fafafa] rounded-3xl border border-stone-200/90 shadow-lg p-5 sm:p-7">
            
            {/* Viewer Navigation Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-800 font-mono">
                  DOCUMENT PREVIEW:
                </span>
                <div className="flex bg-stone-200/80 rounded-lg p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setActivePage(1)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      activePage === 1
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Page 1: Offer Letter
                  </button>
                  <button
                    onClick={() => setActivePage(2)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      activePage === 2
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Page 2: Syllabus
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDocumentModalOpen(true)}
                  aria-label="Expand document modal"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 shadow-xs transition-colors"
                >
                  <Maximize2 size={13} />
                  <span>Full View</span>
                </button>
              </div>
            </div>

            {/* Rendered Document Sheet (Page 1 or Page 2) */}
            <div className="relative bg-white rounded-2xl border border-stone-300/80 shadow-md p-6 sm:p-8 text-stone-800 font-sans min-h-[500px]">
              
              {/* Document Header Logos & Accreditations */}
              <div className="flex items-start justify-between border-b border-stone-200 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xl tracking-tight">
                    <span className="text-blue-600 text-2xl">❖</span>
                    <span>EduSkills<sup className="text-[10px] text-stone-400 font-normal">®</sup></span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mt-0.5">
                    Nation Building Through Skills
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-mono text-stone-500">
                  <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200">ISO 9001:2015</span>
                  <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200">ISO 21001:2018</span>
                  <span className="px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 hidden sm:inline-block">Great Place To Work</span>
                </div>
              </div>

              {/* PAGE 1 CONTENT */}
              {activePage === 1 ? (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span>Ref No: <strong className="text-stone-800">{maskString(INTERNSHIP_DETAILS.refNo)}</strong></span>
                    <span>Downloaded: 11-Oct-2026</span>
                  </div>

                  <div className="text-center py-2">
                    <h3 className="text-lg font-extrabold text-stone-900 underline underline-offset-4 decoration-stone-300">
                      Internship Offer Letter
                    </h3>
                  </div>

                  {/* Metadata Table */}
                  <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/70 font-mono text-xs space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Student Name:</span>
                      <span className="col-span-2 font-bold text-stone-900">{INTERNSHIP_DETAILS.studentName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Stream:</span>
                      <span className="col-span-2 text-stone-800">{INTERNSHIP_DETAILS.stream}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Branch:</span>
                      <span className="col-span-2 text-stone-800">{INTERNSHIP_DETAILS.branch}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Institute Name:</span>
                      <span className="col-span-2 text-stone-800">{INTERNSHIP_DETAILS.institute}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Internship Domain:</span>
                      <span className="col-span-2 font-bold text-blue-700">{INTERNSHIP_DETAILS.domain}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">Duration:</span>
                      <span className="col-span-2 text-stone-800">{INTERNSHIP_DETAILS.duration}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-stone-500">AICTE Student ID:</span>
                      <span className="col-span-2 text-stone-700 font-semibold">{maskString(INTERNSHIP_DETAILS.aicteStudentId)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-stone-700 leading-relaxed">
                    We are pleased to inform you that you have been selected for the <strong>8-Week AICTE – EduSkills Virtual Internship Program</strong>. During this internship, you will learn and demonstrate industry-relevant skills in Machine Learning and Data Science.
                  </div>

                  <div className="space-y-1.5 text-[11px] text-stone-600 leading-normal">
                    <p className="font-bold text-stone-800">Structure & Evaluation Guidelines:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Follows an 8-week structured learning plan with weekly assessments.</li>
                      <li>Submission of project documentation and assignments for certain modules.</li>
                      <li>Final Assessment Test & Capstone submission in the final week.</li>
                      <li>Virtual Internship Certificate awarded upon successful completion.</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                    <span>Status: Selected for Internship (Offer Letter)</span>
                    <span>Page 1 of 2</span>
                  </div>
                </div>
              ) : (
                /* PAGE 2 CONTENT (Curriculum Table) */
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
                    <span className="font-bold text-stone-800">The Week-wise Structure of the Internship</span>
                    <span>Page 2 of 2</span>
                  </div>

                  <div className="overflow-x-auto border border-stone-200 rounded-xl">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-stone-100 border-b border-stone-200 font-mono text-stone-700">
                        <tr>
                          <th className="p-2 w-16">Week</th>
                          <th className="p-2 w-44">Module</th>
                          <th className="p-2">Curriculum Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {INTERNSHIP_DETAILS.curriculum.map((c) => (
                          <tr key={c.week} className="hover:bg-stone-50">
                            <td className="p-2 font-mono font-bold text-blue-600">Week {c.week}</td>
                            <td className="p-2 font-semibold text-stone-900">{c.module}</td>
                            <td className="p-2 text-stone-600 text-[10px] leading-relaxed">{c.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/80 text-[10px] text-amber-900 flex items-center justify-between">
                    <span>Supported by EduSkills Academy • Under the Patronage of AICTE</span>
                    <span className="font-mono">Director: Bibek Ranjan</span>
                  </div>
                </div>
              )}

            </div>

            {/* Document Caption */}
            <div className="mt-4 px-2 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Info size={13} className="text-blue-600" />
                <span>AICTE EduSkills Virtual Internship • Oct-Dec 2026</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-700 font-semibold">
                ✓ Document Authenticated
              </span>
            </div>

          </div>

          {/* Right: Internship Overview & Week-wise Explorer (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Summary Card */}
            <div className="bg-[#fafafa] rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-blue-600" />
                <h3 className="font-bold text-stone-900 text-base">
                  Program Overview
                </h3>
              </div>
              
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2.5">
                  <Building size={14} className="text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Organization:</span>{' '}
                    <span>EduSkills Foundation (under patronage of AICTE & Ministry of Education)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <GraduationCap size={14} className="text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Domain:</span>{' '}
                    <span>Machine Learning & Data Science</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar size={14} className="text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Timeline:</span>{' '}
                    <span>{INTERNSHIP_DETAILS.duration} (8-Week Program)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Status:</span>{' '}
                    <span className="text-emerald-800 font-medium">Selected for Internship (In Progress)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-blue-50/80 border border-blue-200/60 text-xs text-blue-900 leading-relaxed">
                <strong>Truthful Presentation Note:</strong> This document represents an official selection for an 8-week structured learning internship. The completion certificate is awarded upon passing weekly assessments and the Week 8 capstone project.
              </div>
            </div>

            {/* Interactive Week-by-Week Syllabus Browser */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <h4 className="font-bold text-stone-900 text-sm mb-3 flex items-center justify-between">
                <span>Interactive Curriculum Navigator</span>
                <span className="text-[11px] font-mono text-stone-400">8 Modules</span>
              </h4>

              {/* Week Selector Chips */}
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {INTERNSHIP_DETAILS.curriculum.map((c) => (
                  <button
                    key={c.week}
                    onClick={() => setActiveWeek(c.week)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeWeek === c.week
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    W{c.week}
                  </button>
                ))}
              </div>

              {/* Selected Week Detail Card */}
              {(() => {
                const item = INTERNSHIP_DETAILS.curriculum.find((c) => c.week === activeWeek)!;
                return (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-blue-700">
                        Week {item.week} Focus
                      </span>
                      {item.week === 8 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                          Capstone Project
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-stone-900 text-sm mb-2">
                      {item.module}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Document Viewer Modal */}
      {documentModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          onClick={() => setDocumentModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-stone-900 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileCheck size={18} className="text-emerald-600" />
                <h3 className="font-bold text-lg text-stone-900">
                  EduSkills AICTE Offer Letter (Official Multi-Page View)
                </h3>
              </div>
              <button
                onClick={() => setDocumentModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Document Pages Container */}
            <div className="space-y-6">
              <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between items-center mb-3 text-xs font-mono text-stone-500">
                  <span>DOCUMENT PAGE 1</span>
                  <span>Ref: {maskString(INTERNSHIP_DETAILS.refNo)}</span>
                </div>
                <h4 className="font-bold text-center text-lg text-stone-900 mb-4">
                  Internship Offer Letter
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-4 rounded-lg border border-stone-200">
                  <div><strong>Student Name:</strong> {INTERNSHIP_DETAILS.studentName}</div>
                  <div><strong>Stream:</strong> {INTERNSHIP_DETAILS.stream}</div>
                  <div><strong>Branch:</strong> {INTERNSHIP_DETAILS.branch}</div>
                  <div><strong>Institute:</strong> {INTERNSHIP_DETAILS.institute}</div>
                  <div><strong>Domain:</strong> {INTERNSHIP_DETAILS.domain}</div>
                  <div><strong>Duration:</strong> {INTERNSHIP_DETAILS.duration}</div>
                  <div><strong>AICTE Student ID:</strong> {maskString(INTERNSHIP_DETAILS.aicteStudentId)}</div>
                </div>
              </div>

              <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between items-center mb-3 text-xs font-mono text-stone-500">
                  <span>DOCUMENT PAGE 2</span>
                  <span>Week-wise Structure</span>
                </div>
                <div className="space-y-2 text-xs">
                  {INTERNSHIP_DETAILS.curriculum.map((c) => (
                    <div key={c.week} className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-3">
                      <span className="font-mono font-bold text-blue-600 shrink-0">W{c.week}</span>
                      <div>
                        <strong className="text-stone-900">{c.module}:</strong>{' '}
                        <span className="text-stone-600">{c.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDocumentModalOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

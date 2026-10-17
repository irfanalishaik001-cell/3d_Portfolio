import React from 'react';
import { X, Printer, Download, ExternalLink, Mail, MapPin, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import { PERSONAL_INFO, INTERNSHIP_DETAILS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-stone-200 text-stone-900 p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-500">
              Curriculum Vitae Preview
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print or save resume as PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="printable-resume" className="space-y-6 text-stone-800 text-xs sm:text-sm">
          
          {/* Header */}
          <div className="border-b border-stone-200 pb-5">
            <h1 id="resume-title" className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-stone-600 font-medium mt-1">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <Mail size={12} /> {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                GitHub
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
              <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                LeetCode
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <GraduationCap size={14} />
              Education
            </h2>
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
              <div className="flex justify-between items-start flex-wrap gap-1">
                <div>
                  <h3 className="font-bold text-stone-900">
                    B.Tech in Artificial Intelligence & Machine Learning
                  </h3>
                  <p className="text-stone-600 text-xs">
                    {PERSONAL_INFO.college}
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500 font-medium">
                  2023 - 2027 (Expected)
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                Core Coursework: Data Structures & Algorithms, Design & Analysis of Algorithms, Object-Oriented Programming (Java), Database Management Systems (SQL), Probability & Statistics for Data Science, Machine Learning Foundations.
              </p>
            </div>
          </div>

          {/* Experience / Virtual Internship */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <Briefcase size={14} />
              Experience & Selected Programs
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <h3 className="font-bold text-stone-900">
                      Machine Learning & Data Science Virtual Intern
                    </h3>
                    <p className="text-stone-600 text-xs">
                      {INTERNSHIP_DETAILS.programTitle} (AICTE & EduSkills Foundation)
                    </p>
                  </div>
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    {INTERNSHIP_DETAILS.duration}
                  </span>
                </div>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-stone-600 leading-relaxed">
                  <li>
                    Selected for an intensive 8-week structured curriculum covering supervised regression, feature scaling, model validation, and clustering with Scikit-learn.
                  </li>
                  <li>
                    Engineered text preprocessing and NLP classification pipelines using TF-IDF and Naive Bayes for customer sentiment analysis.
                  </li>
                  <li>
                    Integrated relational SQL database storage and deployed RESTful inference endpoints with Flask APIs.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <Award size={14} />
              Key Projects
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <h3 className="font-bold text-stone-900">
                    FarmDirect AI — Direct Agricultural Marketplace & Price Forecaster
                  </h3>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Hackathon Finalist
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Built a machine learning platform connecting agricultural growers directly with consumers, utilizing ensemble regression to estimate fair farmgate prices based on seasonal wholesale data.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] font-mono text-stone-500">
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Python</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Scikit-learn</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Pandas</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">React</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Flask</span>
                </div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <h3 className="font-bold text-stone-900">
                    Customer Sentiment Analysis & NLP Pipeline
                  </h3>
                  <span className="text-[11px] font-mono text-stone-500">
                    EduSkills Capstone
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Implemented an automated NLP classification engine that processes incoming reviews, extracts sentiment metrics, logs predictions into SQL, and serves live REST predictions.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
              <Code size={14} />
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/70">
                <span className="font-semibold text-stone-900">Programming:</span>{' '}
                <span className="text-stone-600">Python, Java, C, SQL</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/70">
                <span className="font-semibold text-stone-900">AI & ML Stack:</span>{' '}
                <span className="text-stone-600">NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, NLP</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/70">
                <span className="font-semibold text-stone-900">CS Fundamentals:</span>{' '}
                <span className="text-stone-600">Data Structures & Algorithms, OOP, DBMS, RDBMS</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/70">
                <span className="font-semibold text-stone-900">Creative & Tools:</span>{' '}
                <span className="text-stone-600">Git, GitHub, VS Code, DaVinci Resolve, Premiere Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

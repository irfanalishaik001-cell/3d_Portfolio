import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Code,
  MessageSquare,
  ArrowUpRight,
  Heart,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DoodleSparkle, DoodleUnderline } from './DoodleDecorations';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Internship Opportunity / Project Collaboration');
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2563eb', '#38bdf8', '#fbbf24'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    // Direct mailto generation without fake backend claims
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} - from ${senderName}`
    )}&body=${encodeURIComponent(
      `Hi Irfan,\n\nName: ${senderName}\nEmail: ${senderEmail}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent via Developer Portfolio.`
    )}`;

    window.location.href = mailtoUrl;
    setIsComposing(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3 font-mono">
            <MessageSquare size={13} />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            Let's Build Something Meaningful
            <DoodleSparkle size={22} className="text-amber-400 hidden sm:inline-block" />
          </h2>
          <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
            Open to software engineering internships, AI/ML research collaborations, hackathon teams, and technical discussions.
          </p>
        </div>

        {/* Contact Layout: Left Direct Cards / Right Compose Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Email & Social Profiles (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Primary Contact
              </span>
              
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 mb-4">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className={`p-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-stone-200/70 text-stone-700 border border-stone-200 shadow-xs'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-xs"
              >
                <Mail size={14} />
                <span>Launch Mail App</span>
              </a>
            </div>

            {/* Professional Profiles */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 block mb-3">
                Professional Networks
              </span>

              <div className="space-y-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200/70 hover:border-stone-400 bg-stone-50/50 hover:bg-white text-xs font-medium text-stone-800 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} className="text-stone-700" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight size={14} className="text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200/70 hover:border-stone-400 bg-stone-50/50 hover:bg-white text-xs font-medium text-stone-800 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} className="text-blue-600" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight size={14} className="text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200/70 hover:border-stone-400 bg-stone-50/50 hover:bg-white text-xs font-medium text-stone-800 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Code size={16} className="text-amber-600" />
                    <span>LeetCode Problem Archive</span>
                  </div>
                  <ArrowUpRight size={14} className="text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Pre-Formatted Message Composer (Col 7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-lg text-left">
              <h3 className="text-lg font-bold text-stone-900 tracking-tight mb-1">
                Compose Direct Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Fills directly into your desktop or mobile email client without third-party form telemetry.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. sarah@techcorp.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Subject / Discussion Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-stone-900"
                  >
                    <option value="Internship Opportunity 2026">Software Engineering / AI Internship Opportunity</option>
                    <option value="Project Collaboration / Hackathon">Hackathon Collaboration / Project Partnership</option>
                    <option value="FarmDirect AI Discussion">FarmDirect AI Technical Inquiry</option>
                    <option value="General Technical Chat">General Engineering Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the opportunity, role requirements, or project details..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-stone-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Send size={14} />
                  <span>Send via Email Client</span>
                </button>

                {isComposing && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
                    <Check size={14} />
                    <span>Email client opened! If it didn't open automatically, send directly to <strong>{PERSONAL_INFO.email}</strong>.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            <span>•</span>
            <span>B.Tech AI & ML • SRKR Engineering College</span>
          </div>

          {/* Hand-Drawn Digital Signature Doodle */}
          <div className="flex items-center gap-2 font-serif italic text-stone-600 text-sm">
            <span>Crafted with clean code & purpose</span>
            <span className="text-blue-600 font-bold not-italic font-mono text-xs">✍</span>
          </div>
        </div>

      </div>
    </section>
  );
};

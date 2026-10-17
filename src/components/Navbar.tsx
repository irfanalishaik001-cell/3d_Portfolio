import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Whiteboard', href: '#whiteboard' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Internship', href: '#internship' },
    { label: 'About', href: '#about' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact', href: '#contact' },
    { label: 'Free Space', href: '#free-space-tech' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Personal Mark */}
          <a
            href="#"
            className="flex items-center gap-2 group text-stone-900 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:bg-blue-600 transition-colors">
              IA
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-stone-900 group-hover:text-blue-600 transition-colors tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-stone-500 hidden sm:block">
                B.Tech AI & ML • SRKR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 p-1.5 rounded-full border border-stone-200/70 text-xs font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-stone-900 hover:bg-white/90 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Action / Status */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Availability Pill */}
            {PERSONAL_INFO.availableForWork && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Internships 2026</span>
              </div>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white hover:bg-blue-600 text-xs font-semibold transition-all shadow-xs"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-200 px-5 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for Summer/Fall 2026</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

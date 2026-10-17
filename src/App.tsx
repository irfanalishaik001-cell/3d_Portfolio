/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhiteboardCanvas } from './components/WhiteboardCanvas';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InternshipSection } from './components/InternshipSection';
import { AboutSection } from './components/AboutSection';
import { ResourcesSection } from './components/ResourcesSection';
import { ContactSection } from './components/ContactSection';
import { FreeSpaceTechStacks } from './components/FreeSpaceTechStacks';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-stone-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Floating Minimalist Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Profile Image, Bio & Quick CTAs */}
        <Hero />

        {/* 2. Signature Full-Page Interactive Whiteboard */}
        <WhiteboardCanvas />

        {/* 3. Skills Matrix & Learning Radar */}
        <SkillsSection />

        {/* 4. Projects & Hackathon Showcase (FarmDirect AI) */}
        <ProjectsSection />

        {/* 5. Official Internship & Recognition (EduSkills AICTE Offer Letter) */}
        <InternshipSection />

        {/* 6. About Me & Academic Milestones */}
        <AboutSection />

        {/* 7. Verified Documentation & Resource Directory */}
        <ResourcesSection />

        {/* 8. Contact & Communications */}
        <ContactSection />

        {/* 9. Movable Free-Space Technology Nebula below Contact */}
        <FreeSpaceTechStacks />
      </main>
    </div>
  );
}

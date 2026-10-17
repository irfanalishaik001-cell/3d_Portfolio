import React, { useState } from 'react';
import { RESOURCE_LINKS } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { ExternalLink, BookOpen, Search, Sparkles } from 'lucide-react';
import { DoodleSparkle } from './DoodleDecorations';

export const ResourcesSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'AI & Data Science', label: 'AI & Data Science' },
    { id: 'Programming', label: 'Programming' },
    { id: 'Development Tools', label: 'Dev Tools' },
    { id: 'Web Development', label: 'Web Tech' },
    { id: 'Computer Science', label: 'Algorithms' },
  ];

  const filtered = RESOURCE_LINKS.filter((res) => {
    const matchesCat = filter === 'all' || res.category === filter;
    const matchesSearch =
      search === '' ||
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="resources" className="py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3 font-mono">
              <BookOpen size={13} />
              <span>Verified Developer Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              Documentation & Tool Directory
              <DoodleSparkle size={20} className="text-amber-400 hidden sm:inline-block" />
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Curated official documentation, standard library references, and coding platforms that anchor my software engineering and machine learning workflow.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documentation..."
              aria-label="Filter documentation resources"
              className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filter === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-stone-200/80 bg-[#fafafa] hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <TechIcon name={item.icon} size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-500">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-mono text-stone-500">
                <span className="text-stone-400 group-hover:text-stone-600">
                  {new URL(item.url).hostname}
                </span>
                <span className="text-blue-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Visit Docs <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

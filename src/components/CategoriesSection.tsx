import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Category } from '../types/ecommerce';

export const CategoriesSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('catalog', 'All')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 group"
          >
            <span>View Complete Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('catalog', cat.id as Category)}
              className="group relative bg-white border border-stone-200/90 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-stone-400/80 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                    <span>Explore Department</span>
                    <span className="font-mono text-[11px] text-stone-500">{cat.count}</span>
                  </div>
                  <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

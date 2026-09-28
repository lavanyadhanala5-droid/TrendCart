import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroImage from '../assets/images/hero_fashion_lifestyle_1790580696608.jpg';

export const Hero: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Hero Image with measured overlay scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="TrendCart Autumn Winter Collection"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 min-h-[580px] flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-stone-300 text-xs font-medium tracking-wide mb-6 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Autumn / Winter 2026 Lookbook</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1] mb-6 text-balance">
            Refined Living, Crafted for the Modern Wardrobe.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 max-w-xl">
            Discover intentional silhouettes, organic sustainable knits, and precision lifestyle tech engineered for contemporary ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('catalog')}
              className="py-3.5 px-7 bg-white text-stone-950 hover:bg-stone-100 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('catalog', 'Offers')}
              className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold tracking-wide transition-all"
            >
              Seasonal Offers (Up to 30% Off)
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Markers */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-stone-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free Shipping over $150</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>30-Day Effortless Returns</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Certified 100% Authentic</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Carbon-Neutral Packaging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

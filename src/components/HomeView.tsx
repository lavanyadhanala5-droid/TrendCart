import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, Quote, ArrowUpRight } from 'lucide-react';
import { Hero } from './Hero';
import { CategoriesSection } from './CategoriesSection';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const HomeView: React.FC = () => {
  const { products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'electronics'>('bestseller');

  const displayedProducts = products
    .filter((p) => {
      if (activeTab === 'bestseller') return p.isBestseller;
      if (activeTab === 'new') return p.isNew;
      if (activeTab === 'electronics') return p.category === 'Electronics';
      return true;
    })
    .slice(0, 6);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Departments / Categories Showcase */}
      <CategoriesSection />

      {/* 3. Featured Collection Grid */}
      <section className="py-16 sm:py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                Curated Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900 mt-1">
                Featured Highlights
              </h2>
            </div>

            {/* Segmented Control Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('bestseller')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'bestseller'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Bestsellers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'new'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                New In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('electronics')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'electronics'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Lifestyle Tech
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-2 py-3 px-8 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Promotional Campaign Banner */}
      <section className="py-16 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <Sparkles className="w-4 h-4" />
                Limited Promotional Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Autumn Transition Sale — Save 20% Sitewide
              </h2>
              <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
                Enjoy 20% off all knitwear, tailored outerwear, and audiophile acoustic accessories using promotion code <strong className="text-white underline decoration-amber-400">TREND20</strong> at checkout.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => navigateTo('catalog', 'Offers')}
                className="py-3.5 px-6 bg-white text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-100 transition-all text-center shadow-lg"
              >
                Shop Promotional Archive
              </button>
              <div className="text-center text-[11px] text-stone-400">
                Automatic code application in shopping cart
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Testimonials & Editorial Proof */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              Client Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900 mt-1">
              Endorsed by Discerning Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "The Wool-Blend Trench Coat is arguably the best investment I made this year. Immaculate shoulder line, heavy fabric that drapes like haute couture, and delivery arrived within 3 days."
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs">
                <p className="font-semibold text-stone-900">Camille Dupont</p>
                <p className="text-stone-400 text-[11px]">Architectural Designer, Paris</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "The StudioPro ANC headphones are stunning. Machined aluminum, sublime acoustic resolution, and battery life that effortlessly survives transatlantic flights."
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs">
                <p className="font-semibold text-stone-900">Marcus Sterling</p>
                <p className="text-stone-400 text-[11px]">Creative Director, New York</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "The kids organic cotton knit set holds up beautifully through multiple washes. Soft, completely tagless, and lovely muted earthy tones."
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs">
                <p className="font-semibold text-stone-900">Elena Rostova</p>
                <p className="text-stone-400 text-[11px]">Interior Stylist, Stockholm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

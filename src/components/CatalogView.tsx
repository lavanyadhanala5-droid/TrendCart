import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

export const CatalogView: React.FC = () => {
  const { 
    products, 
    filters, 
    sortBy, 
    setSortBy, 
    searchQuery, 
    setSearchQuery,
    resetFilters,
    setFilter
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // 2. Category
      if (filters.category === 'Offers') {
        if (product.discountPercent < 20) return false;
      } else if (filters.category !== 'All') {
        if (product.category !== filters.category) return false;
      }

      // 3. Price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 4. Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 5. Sizes
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 6. Colors
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some((c) => 
          filters.colors.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()) || fc.toLowerCase().includes(c.name.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      // 'popularity' default:
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [products, filters, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Title Area */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900">
              {filters.category === 'All' ? 'Complete Collection' : `${filters.category} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Showing <span className="font-semibold text-stone-800 tabular-nums">{filteredProducts.length}</span> curated items
            </p>
          </div>

          {/* Quick Active Filters Summary Bar */}
          <div className="flex items-center gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-700">
                <Search className="w-3 h-3" />
                <span>"{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-700 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Controls Toolbar: Mobile filter trigger + Sort selector */}
        <div className="flex items-center justify-between gap-4 mt-4">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 shadow-2xs hover:bg-stone-50 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Catalog</span>
          </button>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-stone-500 hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-stone-300 hover:border-stone-400 rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer shadow-2xs transition-colors"
              >
                <option value="popularity">Popularity & Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar (Left Column) */}
        <div className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-xl border border-stone-200 sticky top-24 shadow-2xs">
          <FilterSidebar />
        </div>

        {/* Product Grid Area (Right 3 Columns) */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center my-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <Search className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1">
                No products match your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                Try widening your price range, selecting different size filters, or clearing your active search query.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide-out Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <span className="font-semibold text-stone-900 text-sm">Filters</span>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar onCloseMobile={() => setIsMobileFilterOpen(false)} />
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

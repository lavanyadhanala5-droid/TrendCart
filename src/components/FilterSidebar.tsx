import React from 'react';
import { RotateCcw, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types/ecommerce';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '42mm', 'One Size'];

const AVAILABLE_COLORS = [
  { name: 'Black', hex: '#1C1917' },
  { name: 'White / Cream', hex: '#FDFBF7' },
  { name: 'Beige / Camel', hex: '#D8CEBF' },
  { name: 'Navy', hex: '#1E293B' },
  { name: 'Olive / Green', hex: '#585D48' },
  { name: 'Clay / Rust', hex: '#A35338' },
  { name: 'Silver / Grey', hex: '#A8A8A8' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { filters, setFilter, resetFilters } = useStore();

  const categories: { label: string; value: Category }[] = [
    { label: 'All Categories', value: 'All' },
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' },
    { label: 'Kids', value: 'Kids' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Offers & Sale', value: 'Offers' },
  ];

  const handleSizeToggle = (size: string) => {
    const current = filters.sizes;
    const exists = current.includes(size);
    if (exists) {
      setFilter('sizes', current.filter((s) => s !== size));
    } else {
      setFilter('sizes', [...current, size]);
    }
  };

  const handleColorToggle = (colorName: string) => {
    const current = filters.colors;
    const exists = current.includes(colorName);
    if (exists) {
      setFilter('colors', current.filter((c) => c !== colorName));
    } else {
      setFilter('colors', [...current, colorName]);
    }
  };

  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 350 || 
    filters.sizes.length > 0 || 
    filters.colors.length > 0 || 
    filters.minRating > 0;

  return (
    <aside className="w-full space-y-6">
      {/* Header with Clear button */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
            Filters
          </h3>
          <p className="text-xs text-stone-500">Refine by your preferences</p>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
          Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setFilter('category', cat.value);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                filters.category === cat.value
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range Slider & Presets */}
      <div className="space-y-3 pt-3 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Price Range
          </label>
          <span className="text-xs font-semibold text-stone-900 tabular-nums">
            ${filters.minPrice} – ${filters.maxPrice}
          </span>
        </div>
        
        <input
          type="range"
          min="0"
          max="350"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-stone-900 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {[
            { label: 'Under $75', min: 0, max: 75 },
            { label: '$75 - $150', min: 75, max: 150 },
            { label: '$150 - $220', min: 150, max: 220 },
            { label: 'Over $220', min: 220, max: 350 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setFilter('minPrice', preset.min);
                setFilter('maxPrice', preset.max);
              }}
              className={`py-1.5 px-2 text-[11px] rounded-md font-medium border text-center transition-colors ${
                filters.minPrice === preset.min && filters.maxPrice === preset.max
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Size Filter */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
          Size
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-1.5 px-3 text-xs font-medium rounded-md border transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Color Swatches */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
          Color Tone
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {AVAILABLE_COLORS.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorToggle(color.name)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all text-left ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 font-semibold'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="truncate">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
          Customer Rating
        </label>
        <div className="space-y-1">
          {[
            { label: '4.8 ★ & above', min: 4.8 },
            { label: '4.5 ★ & above', min: 4.5 },
            { label: '4.0 ★ & above', min: 4.0 },
            { label: 'All Ratings', min: 0 },
          ].map((r) => (
            <button
              key={r.min}
              type="button"
              onClick={() => setFilter('minRating', r.min)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                filters.minRating === r.min
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                <span>{r.label}</span>
              </div>
              {filters.minRating === r.min && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Check, 
  Ruler, 
  X,
  Share2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailsView: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    navigateTo, 
    toggleWishlist, 
    isInWishlist, 
    showToast 
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 mb-4">Product not found or unavailable.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'Default');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0] || { name: 'Standard', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'delivery'>('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedSize, selectedColor);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast('Product link copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Nav */}
      <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-stone-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('catalog', selectedProduct.category)}
          className="hover:text-stone-900 transition-colors"
        >
          {selectedProduct.category}
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium truncate max-w-xs">{selectedProduct.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Gallery Column (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {selectedProduct.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-stone-900 text-white text-xs font-bold tracking-wider uppercase rounded-sm shadow-sm">
                -{selectedProduct.discountPercent}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={handleShare}
              title="Share item"
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-stone-700 hover:text-stone-900 shadow-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Value callout row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-white border border-stone-200/80 rounded-xl text-center">
              <Truck className="w-4 h-4 mx-auto text-amber-700 mb-1" />
              <p className="text-[11px] font-semibold text-stone-800">Dispatch in 24h</p>
              <p className="text-[10px] text-stone-500">Tracked global delivery</p>
            </div>
            <div className="p-3 bg-white border border-stone-200/80 rounded-xl text-center">
              <ShieldCheck className="w-4 h-4 mx-auto text-amber-700 mb-1" />
              <p className="text-[11px] font-semibold text-stone-800">Authentic & Pure</p>
              <p className="text-[10px] text-stone-500">Certified materials</p>
            </div>
            <div className="p-3 bg-white border border-stone-200/80 rounded-xl text-center">
              <Star className="w-4 h-4 mx-auto text-amber-700 mb-1" />
              <p className="text-[11px] font-semibold text-stone-800">Top Rated</p>
              <p className="text-[10px] text-stone-500">{selectedProduct.reviewCount}+ verified reviews</p>
            </div>
          </div>
        </div>

        {/* Purchase Module Column (Right 5 Cols - Sticky) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-amber-800">
                {selectedProduct.category} Collection
              </span>
              <div className="flex items-center gap-1 font-medium text-stone-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                <span className="tabular-nums font-bold">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-stone-400">({selectedProduct.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900 leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                ${selectedProduct.price}
              </span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <>
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ${selectedProduct.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save ${selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 mt-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-stone-700">
                In Stock ({selectedProduct.stock} items left in warehouse)
              </span>
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Color Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800">
                Color Tone: <span className="font-normal text-stone-600">{selectedColor.name}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {selectedProduct.colors.map((color) => {
                const isChosen = selectedColor.hex === color.hex;
                return (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative p-1 rounded-full border-2 transition-all ${
                      isChosen ? 'border-stone-900 scale-110' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-stone-300 shadow-2xs"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800">
                Select Size: <span className="font-normal text-stone-600">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Wishlist Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-stone-800 block">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Wishlist Toggle Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`flex-1 py-2.5 px-4 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isFavorited
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Action CTAs: Add to Cart & Buy Now */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ${(selectedProduct.price * quantity).toFixed(0)}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Tabs for Details, Specs, Delivery */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Features & Craft
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="pt-3 text-xs text-stone-600 leading-relaxed">
              {activeTab === 'details' && (
                <p>{selectedProduct.description}</p>
              )}

              {activeTab === 'specs' && (
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2 text-stone-600">
                  <p>• <strong>Complimentary standard shipping</strong> on all orders exceeding $150.</p>
                  <p>• Express air dispatch arriving within 2–3 business days.</p>
                  <p>• 30-day effortless return and exchange policy on all unworn items with original tags.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-24 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                You May Also Admire
              </span>
              <h2 className="text-2xl font-bold font-display tracking-tight text-stone-900 mt-1">
                Complementary Pieces
              </h2>
            </div>
            <button
              onClick={() => navigateTo('catalog', selectedProduct.category)}
              className="text-xs font-semibold text-stone-800 hover:underline"
            >
              View More in {selectedProduct.category}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-bold text-stone-900">Standard Sizing Guide</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Measurements reflect garment dimensions laid flat in inches. Fits true to size.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Chest / Bust</th>
                    <th className="py-2 px-3">Waist</th>
                    <th className="py-2 px-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-stone-600">
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">XS</td>
                    <td className="py-2 px-3">34 - 36"</td>
                    <td className="py-2 px-3">28 - 30"</td>
                    <td className="py-2 px-3">27.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">S</td>
                    <td className="py-2 px-3">36 - 38"</td>
                    <td className="py-2 px-3">30 - 32"</td>
                    <td className="py-2 px-3">28.0"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">M</td>
                    <td className="py-2 px-3">38 - 40"</td>
                    <td className="py-2 px-3">32 - 34"</td>
                    <td className="py-2 px-3">28.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">L</td>
                    <td className="py-2 px-3">40 - 42"</td>
                    <td className="py-2 px-3">34 - 36"</td>
                    <td className="py-2 px-3">29.0"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-stone-900">XL</td>
                    <td className="py-2 px-3">42 - 44"</td>
                    <td className="py-2 px-3">36 - 38"</td>
                    <td className="py-2 px-3">29.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

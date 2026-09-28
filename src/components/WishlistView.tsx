import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistView: React.FC = () => {
  const { 
    wishlist, 
    products, 
    toggleWishlist, 
    moveToCartFromWishlist, 
    navigateTo, 
    viewProduct 
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5 text-rose-500">
          <Heart className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="text-2xl font-bold font-display text-stone-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Tap the heart icon on any product to save items you love for later or track when they go on sale.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 py-3 px-8 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {savedProducts.length} saved {savedProducts.length === 1 ? 'item' : 'items'} ready for your wardrobe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all duration-200"
          >
            {/* Image */}
            <div
              onClick={() => viewProduct(product.id)}
              className="relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-rose-600 hover:bg-white transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info & Move to Cart */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  {product.category}
                </span>
                <h3
                  onClick={() => viewProduct(product.id)}
                  className="text-xs font-semibold text-stone-900 hover:underline cursor-pointer line-clamp-1 mt-0.5"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-stone-900 tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => moveToCartFromWishlist(product.id)}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

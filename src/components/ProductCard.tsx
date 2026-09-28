import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { viewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => viewProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:border-stone-400/80 hover:shadow-md transition-all duration-300 cursor-pointer text-left"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <ShoppingBag className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-xs font-medium text-stone-600">{product.name}</span>
          </div>
        )}

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {product.discountPercent > 0 && (
              <span className="px-2 py-0.5 bg-stone-900 text-white text-[11px] font-semibold tracking-wider uppercase rounded-sm">
                -{product.discountPercent}%
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 bg-amber-700 text-white text-[11px] font-medium tracking-wider uppercase rounded-sm">
                New
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full transition-all duration-200 pointer-events-auto shadow-sm ${
              isFavorited
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                : 'bg-white/90 backdrop-blur-sm text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isFavorited ? 'fill-rose-500 stroke-rose-500 scale-110' : 'stroke-[1.75]'
              }`}
            />
          </button>
        </div>

        {/* Floating Quick Add Button */}
        <div className="absolute bottom-3 inset-x-3 pointer-events-auto md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium tracking-wide uppercase text-[11px] text-stone-600">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-medium text-stone-700">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-stone-900 text-sm line-clamp-1 group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Colors */}
        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-stone-900 text-base tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <span
                key={idx}
                title={color.name}
                className="w-2.5 h-2.5 rounded-full border border-stone-300 shadow-2xs"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-stone-400 font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

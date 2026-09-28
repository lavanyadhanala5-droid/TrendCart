import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ArrowLeft,
  CheckCircle2,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigateTo,
    viewProduct
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-5 text-stone-400">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="text-2xl font-bold font-display text-stone-900 mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our curated collections for seasonal apparel and lifestyle essentials.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 py-3 px-8 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
        >
          <span>Explore Collections</span>
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
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review your chosen items before proceeding to secure checkout
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Indicator */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-700" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    Congratulations! You qualified for free shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-stone-950 font-bold tabular-nums">${remainingForFreeShipping}</strong> more for complimentary shipping
                  </span>
                )}
              </span>
              <span className="tabular-nums font-semibold text-stone-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  progressPercent === 100 ? 'bg-emerald-600' : 'bg-stone-900'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Table / Cards */}
          <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden shadow-2xs">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Item Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => viewProduct(item.product.id)}
                    className="w-20 h-24 object-cover rounded-lg bg-stone-100 shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => viewProduct(item.product.id)}
                      className="text-sm font-semibold text-stone-900 hover:underline cursor-pointer truncate"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>Size: <strong className="text-stone-700">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <div className="flex items-center gap-1.5">
                        <span>Color:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-stone-700">{item.selectedColor.name}</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-stone-900 tabular-nums sm:hidden">
                      ${item.product.price} each
                    </p>
                  </div>
                </div>

                {/* Stepper & Price & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor.hex,
                          item.quantity - 1
                        )
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor.hex,
                          item.quantity + 1
                        )
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal for this item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-bold text-stone-900 tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)
                    }
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    aria-label="Remove item from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 pt-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Order Summary Column (4 Cols - Sticky) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-6 sticky top-24">
          <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          {/* Promo Code Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Promotional Code
            </label>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{appliedPromo} (-{cartDiscount > 0 ? `$${cartDiscount}` : 'Free Ship'})</span>
                </div>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label="Remove promo code"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TREND20"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoError) setPromoError('');
                  }}
                  className="flex-1 uppercase font-mono px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
            )}
            <div className="text-[11px] text-stone-500">
              Try code <span className="font-mono text-stone-800 font-semibold">TREND20</span> for 20% off
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Totals Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">${cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount Applied</span>
                <span className="tabular-nums">-${cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span className="flex items-center gap-1">
                <span>Estimated Shipping</span>
                {cartShipping === 0 && <span className="text-[10px] text-emerald-600 font-bold uppercase">(Free)</span>}
              </span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {cartShipping === 0 ? '$0' : `$${cartShipping}`}
              </span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="text-sm font-bold text-stone-900">Total</span>
                <p className="text-[10px] text-stone-400">Includes all applicable duties & taxes</p>
              </div>
              <span className="text-xl font-extrabold text-stone-950 tabular-nums">
                ${cartTotal}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            type="button"
            onClick={() => navigateTo('checkout')}
            className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

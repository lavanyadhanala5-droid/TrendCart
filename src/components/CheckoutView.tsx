import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Lock, 
  ArrowLeft, 
  CheckCircle2,
  Smartphone,
  Banknote,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address } from '../types/ecommerce';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    user, 
    placeOrder, 
    navigateTo 
  } = useStore();

  const [fullName, setFullName] = useState(user?.addresses[0]?.fullName || user?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 'sarah.j@example.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Portland');
  const [state, setState] = useState(user?.addresses[0]?.state || 'OR');
  const [zipCode, setZipCode] = useState(user?.addresses[0]?.zipCode || '97201');
  const [country, setCountry] = useState(user?.addresses[0]?.country || 'United States');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod' | 'digital'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('382');
  const [upiId, setUpiId] = useState('sarah@okbank');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 mb-4">You have no items in your cart to checkout.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg"
        >
          Return to Shopping
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !street.trim() || !city.trim() || !zipCode.trim()) {
      setFormError('Please fill in all mandatory delivery address fields.');
      return;
    }
    setFormError('');

    const shippingAddress: Address = {
      id: 'addr-' + Date.now(),
      fullName,
      phone,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: true
    };

    const paymentLabel = 
      paymentMethod === 'card' ? 'Credit Card (Ending in 4242)' :
      paymentMethod === 'upi' ? `UPI / Instant Pay (${upiId})` :
      paymentMethod === 'digital' ? 'Apple Pay / Google Pay' : 'Cash on Delivery (COD)';

    placeOrder(shippingAddress, paymentLabel);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigateTo('cart')}
          className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Back to cart"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Encrypted 256-bit transactional checkout
          </p>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Contact Information */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              2. Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Recipient Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Street Address & Apartment *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              3. Delivery Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setShippingOption('standard')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  shippingOption === 'standard'
                    ? 'border-stone-900 bg-stone-50/70 shadow-2xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingOption === 'standard'}
                  onChange={() => setShippingOption('standard')}
                  className="mt-0.5 accent-stone-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Standard Delivery</span>
                    <span className="font-bold text-stone-900">
                      {cartShipping === 0 ? 'FREE' : `$${cartShipping}`}
                    </span>
                  </div>
                  <p className="text-stone-500 mt-0.5">3–5 business days • Carbon-neutral</p>
                </div>
              </label>

              <label
                onClick={() => setShippingOption('express')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  shippingOption === 'express'
                    ? 'border-stone-900 bg-stone-50/70 shadow-2xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingOption === 'express'}
                  onChange={() => setShippingOption('express')}
                  className="mt-0.5 accent-stone-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Priority Air Express</span>
                    <span className="font-bold text-stone-900">$18</span>
                  </div>
                  <p className="text-stone-500 mt-0.5">1–2 business days • Priority dispatch</p>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              4. Payment Method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'upi', label: 'UPI / NetBank', icon: Smartphone },
                { id: 'digital', label: 'Apple / GPay', icon: Lock },
                { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment Details Sub-forms */}
            <div className="pt-2">
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-xl space-y-3 border border-stone-200">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 bg-white border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 bg-white border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">CVC / Security Code</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        className="w-full text-xs font-mono px-3 py-2 bg-white border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 bg-stone-50 rounded-xl space-y-2 border border-stone-200">
                  <label className="text-[11px] font-semibold text-stone-700 block">UPI Virtual ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg outline-none focus:border-stone-900 font-mono"
                  />
                  <p className="text-[10px] text-stone-500">
                    A payment confirmation push notification will be sent to your UPI app.
                  </p>
                </div>
              )}

              {paymentMethod === 'digital' && (
                <div className="p-4 bg-stone-50 rounded-xl text-center space-y-2 border border-stone-200 text-xs text-stone-600">
                  <p className="font-semibold text-stone-900">Biometric One-Touch Checkout</p>
                  <p className="text-[11px]">Authorize seamlessly using your device TouchID or FaceID on confirmation.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-stone-50 rounded-xl space-y-2 border border-stone-200 text-xs text-stone-600">
                  <p className="font-semibold text-stone-900">Cash on Delivery Available</p>
                  <p className="text-[11px]">
                    Pay in cash or through contactless courier terminal at your doorstep. Please have exact change ready.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Review Sidebar (5 Cols - Sticky) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-2xs space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Items in Order ({cart.length})</h2>
            <button
              type="button"
              onClick={() => navigateTo('cart')}
              className="text-xs text-stone-600 hover:text-stone-900 underline"
            >
              Modify
            </button>
          </div>

          {/* Item Thumbnails Preview */}
          <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="py-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{item.product.name}</p>
                    <p className="text-stone-500 text-[11px]">
                      Qty: {item.quantity} · Size: {item.selectedSize}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-stone-900 tabular-nums shrink-0">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-stone-100" />

          {/* Pricing Totals */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">${cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount Code</span>
                <span className="tabular-nums">-${cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {shippingOption === 'express' ? '$18' : (cartShipping === 0 ? '$0 (Free)' : `$${cartShipping}`)}
              </span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-stone-900">Total Due</span>
              <span className="text-2xl font-extrabold text-stone-950 tabular-nums">
                ${shippingOption === 'express' ? cartTotal + (cartShipping === 0 ? 18 : 6) : cartTotal}
              </span>
            </div>
          </div>

          {/* Place Order Action */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:translate-y-[-1px]"
          >
            <Lock className="w-4 h-4" />
            <span>Place Order Securely</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            <span>Encrypted with bank-level 256-bit SSL protocol</span>
          </div>
        </div>
      </form>
    </div>
  );
};

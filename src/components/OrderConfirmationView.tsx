import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Printer, 
  ArrowRight,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationView: React.FC = () => {
  const { lastOrder, navigateTo } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 mb-4">No recent order information found.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Success Card Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Payment & Order Successful
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
          Thank you for choosing TrendCart
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-2 leading-relaxed">
          Your order has been confirmed and is now being packaged with utmost care at our central fulfillment studio.
        </p>

        {/* Order Reference Tag */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs">
          <div>
            <span className="text-stone-500">Order ID: </span>
            <strong className="font-mono text-stone-900 font-bold">{lastOrder.id}</strong>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="text-stone-500">Date: </span>
            <strong className="text-stone-800">{lastOrder.createdAt}</strong>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="text-stone-500">Est. Arrival: </span>
            <strong className="text-emerald-700 font-semibold">{lastOrder.estimatedDelivery}</strong>
          </div>
        </div>
      </div>

      {/* Shipment Tracker Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8 shadow-2xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-6 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Fulfillment Status</span>
        </h2>

        <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
          {/* Connector line */}
          <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-stone-200 -z-0">
            <div className="h-full bg-emerald-600 w-1/3" />
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              ✓
            </span>
            <span className="font-semibold text-stone-900">Order Placed</span>
            <span className="text-[10px] text-stone-400">Completed</span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-stone-100">
              <Package className="w-4 h-4" />
            </span>
            <span className="font-semibold text-stone-900">Preparing</span>
            <span className="text-[10px] text-amber-700 font-medium">In Process</span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center font-bold text-xs">
              <Truck className="w-4 h-4" />
            </span>
            <span className="text-stone-400 font-medium">Dispatched</span>
            <span className="text-[10px] text-stone-400">Pending</span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center font-bold text-xs">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-stone-400 font-medium">Delivered</span>
            <span className="text-[10px] text-stone-400">{lastOrder.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Order Details & Receipt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shipping Destination */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <MapPin className="w-4 h-4 text-stone-500" />
            <span>Shipping Destination</span>
          </div>
          <div className="text-xs text-stone-600 leading-relaxed pt-1">
            <p className="font-semibold text-stone-900">{lastOrder.shippingAddress.fullName}</p>
            <p>{lastOrder.shippingAddress.street}</p>
            <p>
              {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} {lastOrder.shippingAddress.zipCode}
            </p>
            <p>{lastOrder.shippingAddress.country}</p>
            <p className="text-stone-500 pt-1">Contact: {lastOrder.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <CreditCard className="w-4 h-4 text-stone-500" />
            <span>Payment Summary</span>
          </div>
          <div className="text-xs text-stone-600 leading-relaxed pt-1 space-y-1">
            <p>
              Method: <strong className="text-stone-800">{lastOrder.paymentMethod}</strong>
            </p>
            <p>
              Status: <span className="text-emerald-700 font-semibold">Authorized & Cleared</span>
            </p>
            <p>
              Subtotal: <span className="tabular-nums font-medium text-stone-800">${lastOrder.subtotal}</span>
            </p>
            {lastOrder.discount > 0 && (
              <p>
                Discount: <span className="text-emerald-700 font-medium tabular-nums">-${lastOrder.discount}</span>
              </p>
            )}
            <p className="pt-2 border-t border-stone-100 text-stone-900 font-bold text-sm">
              Total Paid: <span className="tabular-nums">${lastOrder.total}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Itemized Order Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs mb-8">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Itemized Order Manifest ({lastOrder.items.length})
          </h3>
        </div>
        <div className="divide-y divide-stone-100">
          {lastOrder.items.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 truncate">{item.product.name}</p>
                  <p className="text-stone-500 text-[11px]">
                    Size: {item.selectedSize} · Color: {item.selectedColor.name} · Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-bold text-stone-900 tabular-nums shrink-0">
                ${item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto py-3 px-6 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('catalog')}
          className="w-full sm:w-auto py-3 px-8 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

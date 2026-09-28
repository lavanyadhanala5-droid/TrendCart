import React, { useState } from 'react';
import { ArrowRight, Check, Instagram, Twitter, Compass, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to TrendCart Lookbook!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-2xl font-bold font-display tracking-tight text-white">
              Trend<span className="text-amber-500">Cart</span>
            </span>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              Curated everyday fashion and precision lifestyle acoustics designed with intentional materials, timeless tailoring, and architectural ease.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <span className="text-xs">Follow our visual diaries:</span>
              <div className="flex items-center gap-2">
                <a
                  href="#instagram"
                  onClick={(e) => { e.preventDefault(); showToast('Opening Instagram channel...'); }}
                  className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => { e.preventDefault(); showToast('Opening Twitter channel...'); }}
                  className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#explore"
                  onClick={(e) => { e.preventDefault(); showToast('Exploring journal...'); }}
                  className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                  aria-label="Lookbook"
                >
                  <Compass className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Join the TrendCart Lookbook
            </span>
            <h3 className="text-lg font-bold text-white">
              Receive private collection drops & 10% off your first acquisition.
            </h3>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-emerald-800 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed. Check your inbox for the welcome code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 outline-none focus:border-stone-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-stone-950 font-semibold text-xs rounded-xl hover:bg-stone-200 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500">
              Unsubscribe anytime. We respect your digital privacy.
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => navigateTo('catalog', 'Women')} className="hover:text-white transition-colors">
                  Women's Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Men')} className="hover:text-white transition-colors">
                  Men's Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Kids')} className="hover:text-white transition-colors">
                  Kids & Youth
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Electronics')} className="hover:text-white transition-colors">
                  Audio & Gadgets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Offers')} className="hover:text-amber-400 transition-colors">
                  Seasonal Archive Sale
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Client Support
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">
                  Shipping Rates & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Garment Care Guides
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Company & Craft
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  About TrendCart
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Sustainable Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Soho Flagship Store
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Careers & Studio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => showToast('Displaying Privacy Policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Displaying Terms of Service')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Accessibility statement loaded')} className="hover:text-white transition-colors">
                  Accessibility Statement
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Cookie preferences updated')} className="hover:text-white transition-colors">
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 TrendCart Lifestyle Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>United States (USD $)</span>
            </span>
            <span>·</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

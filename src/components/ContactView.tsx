import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been received! Our concierge team will reply within 24h.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'How long does standard delivery take to arrive?',
      a: 'Standard orders within the contiguous United States typically arrive within 3 to 5 business days. Express priority courier delivery arrives within 1 to 2 business days. Tracking updates are provided via email.'
    },
    {
      q: 'What is TrendCart’s return and exchange policy?',
      a: 'We offer an effortless 30-day return policy on all unworn garments and unopened electronic items in their original packaging with tags intact. Complimentary return shipping labels are provided through our customer portal.'
    },
    {
      q: 'How do I apply promotional discounts or welcome codes?',
      a: 'Enter your code in the "Promotional Code" input located in your shopping cart or at the checkout step. Discount percentages will immediately reflect in your order subtotal.'
    },
    {
      q: 'Are your apparel collections sustainably and ethically sourced?',
      a: 'Yes. All TrendCart fashion lines prioritize GOTS-certified organic cotton, traceable Australian merino wool, recycled blends, and OEKO-TEX certified low-impact dye processes. Our manufacturing partners uphold rigorous fair-wage standards.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Client Care & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-2">
          How May We Assist You?
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-3 leading-relaxed">
          Whether you need personalized sizing guidance, order tracking assistance, or styling recommendations, our concierge team is at your service.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900">Live AI Concierge</h3>
            <p className="text-xs text-stone-500 mt-1 mb-3">Instant answers with Nathan</p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-trendcart-chat'));
            }}
            className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Chat Now
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900">Email Concierge</h3>
            <p className="text-xs text-stone-500 mt-1 mb-2">Replies within 2 hours</p>
          </div>
          <a href="mailto:support@trendcart.com" className="text-xs font-bold text-stone-900 hover:underline">
            support@trendcart.com
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900">Toll-Free Hotline</h3>
            <p className="text-xs text-stone-500 mt-1 mb-2">Mon–Fri 8:00 AM – 8:00 PM EST</p>
          </div>
          <a href="tel:+18008736322" className="text-xs font-bold text-stone-900 hover:underline">
            +1 (800) 873-6322
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900">Flagship Studio</h3>
            <p className="text-xs text-stone-500 mt-1 mb-2">Soho Architectural Studio</p>
          </div>
          <p className="text-xs font-bold text-stone-900">450 Broadway, New York</p>
        </div>
      </div>

      {/* Form & FAQ Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form (6 Cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-4 h-4 text-stone-800" />
            <h2 className="text-base font-bold text-stone-900">Send an Inquiry</h2>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Inquiry Received</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Thank you, your message has been logged with ticket reference #TC-{Math.floor(1000 + Math.random() * 9000)}. We will respond shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900"
                >
                  <option value="Order & Delivery Inquiry">Order & Delivery Tracking</option>
                  <option value="Return or Exchange">Return or Exchange Request</option>
                  <option value="Product Fit & Sizing">Product Fit & Material Advice</option>
                  <option value="Bespoke Wholesale">Wholesale & Commercial Orders</option>
                  <option value="Other Feedback">Other Feedback</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe how we can assist you..."
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordion (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="mb-4">
            <h2 className="text-base font-bold text-stone-900">Frequently Asked Questions</h2>
            <p className="text-xs text-stone-500 mt-1">Quick answers to common questions about orders & shipping.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-xs hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-stone-800' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

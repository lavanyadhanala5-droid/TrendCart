import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  LogOut,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types/ecommerce';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartTotalCount, 
    wishlist, 
    user, 
    openAuthModal, 
    logoutUser,
    searchQuery,
    setSearchQuery,
    products,
    viewProduct
  } = useStore();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close search or user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; page: 'home' | 'catalog' | 'contact'; category?: Category }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Men', page: 'catalog', category: 'Men' },
    { label: 'Women', page: 'catalog', category: 'Women' },
    { label: 'Kids', page: 'catalog', category: 'Kids' },
    { label: 'Electronics', page: 'catalog', category: 'Electronics' },
    { label: 'Offers', page: 'catalog', category: 'Offers' },
    { label: 'Contact', page: 'contact' },
  ];

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* 1. Announcement Banner */}
      {isBannerVisible && (
        <div className="bg-stone-900 text-stone-200 px-4 py-1.5 text-xs font-medium flex items-center justify-between tracking-wide">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase text-[10px] tracking-wider">Autumn Promo:</span>
            </span>
            <span>Use code <strong className="text-white underline decoration-amber-400">TREND20</strong> for 20% off all orders</span>
            <span className="hidden sm:inline text-stone-400">· Free carbon-neutral shipping over $150</span>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar (Top Bar Contract: 3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Zone 1: Single element brand wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="text-2xl font-bold tracking-tighter font-display text-stone-900 hover:opacity-90 transition-opacity"
          >
            Trend<span className="text-amber-700">Cart</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigateTo(item.page, item.category)}
              className={`text-sm font-medium tracking-tight whitespace-nowrap transition-colors relative py-1 ${
                (activePage === item.page && (!item.category || item.label === item.category))
                  ? 'text-stone-950 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
              {item.label === 'Offers' && (
                <span className="ml-1 text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  %
                </span>
              )}
              {activePage === item.page && (!item.category || item.label === item.category) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Search & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search Trigger / Input */}
          <div ref={searchContainerRef} className="relative">
            <div className="hidden lg:flex items-center bg-stone-100/80 hover:bg-stone-100 rounded-full px-3.5 py-1.5 border border-stone-200 focus-within:border-stone-400 focus-within:bg-white transition-all w-52 focus-within:w-64">
              <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search fashion, audio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit(e);
                }}
                className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Mobile/Tablet Search Icon Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Live Search Autocomplete Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Search input for mobile inside dropdown */}
                <div className="lg:hidden p-3 border-b border-stone-100">
                  <div className="flex items-center bg-stone-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-stone-400 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search apparel, electronics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-stone-900 outline-none"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {searchQuery.trim() ? (
                  <div className="p-2">
                    <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider px-3 py-1.5">
                      Matching Products ({filteredSearchProducts.length})
                    </div>
                    {filteredSearchProducts.length > 0 ? (
                      <div className="divide-y divide-stone-100">
                        {filteredSearchProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              viewProduct(p.id);
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded bg-stone-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-stone-900 truncate">{p.name}</p>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                                <span>{p.category}</span>
                                <span>·</span>
                                <span className="font-semibold text-stone-800">${p.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full mt-1 py-2 text-center text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center justify-center gap-1 hover:bg-stone-50 rounded-md transition-colors"
                        >
                          <span>View all search results</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-stone-500">
                        No products found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-2">
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Wool Trench', 'Silk Top', 'StudioPro', 'Linen Blazer', 'Kids Knits', 'Selvedge Denim'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            navigateTo('catalog');
                            setIsSearchOpen(false);
                          }}
                          className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => navigateTo('wishlist')}
            aria-label="View wishlist"
            className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors relative"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            aria-label="View shopping cart"
            className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartTotalCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                if (user) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  openAuthModal('login');
                }
              }}
              aria-label="Account details"
              className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors flex items-center gap-1.5"
            >
              <UserIcon className="w-5 h-5 stroke-[1.75]" />
              {user && (
                <span className="hidden xl:inline text-xs font-medium text-stone-800 max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            {user && isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="text-xs font-semibold text-stone-900 truncate">{user.name}</p>
                  <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('wishlist');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>My Wishlist ({wishlist.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('cart');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shopping Cart ({cartTotalCount})</span>
                </button>
                <div className="my-1 border-t border-stone-100" />
                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  navigateTo(item.page, item.category);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.page && (!item.category || item.label === item.category)
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>{item.label}</span>
                {item.label === 'Offers' && (
                  <span className="flex items-center gap-1 text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                    <Tag className="w-3 h-3" />
                    Sale
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between bg-stone-50 p-3 rounded-lg">
                <div>
                  <p className="text-xs font-semibold text-stone-900">{user.name}</p>
                  <p className="text-[11px] text-stone-500">{user.email}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className="text-xs text-rose-600 font-medium hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 rounded-lg hover:bg-stone-200 text-center"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 text-center"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

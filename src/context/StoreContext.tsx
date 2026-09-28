import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Category, 
  UserProfile, 
  Address, 
  Order, 
  ActivePage 
} from '../types/ecommerce';
import { INITIAL_PRODUCTS, PROMO_CODES } from '../data/products';

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface FilterState {
  category: Category;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minRating: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  activePage: ActivePage;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  selectedCategory: Category;
  searchQuery: string;
  filters: FilterState;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  user: UserProfile | null;
  appliedPromo: string | null;
  lastOrder: Order | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  toasts: ToastNotification[];

  // Navigation & View Actions
  navigateTo: (page: ActivePage, category?: Category) => void;
  viewProduct: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: Category) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setSortBy: (sort: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount') => void;

  // Cart Actions
  addToCart: (product: Product, quantity?: number, size?: string, color?: { name: string; hex: string }) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateQuantity: (productId: string, size: string, colorHex: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Promo Code Actions
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;

  // Auth Actions
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginUser: (email: string, name?: string) => void;
  signupUser: (name: string, email: string) => void;
  logoutUser: () => void;

  // Order Placement
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order;

  // Toast
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 350,
  sizes: [],
  colors: [],
  minRating: 0,
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tc_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('tc_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-default',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 234-5678',
        addresses: [
          {
            id: 'addr-1',
            fullName: 'Sarah Jenkins',
            phone: '+1 (555) 234-5678',
            street: '742 Evergreen Terrace, Apt 4B',
            city: 'Portland',
            state: 'OR',
            zipCode: '97201',
            country: 'United States',
            isDefault: true
          }
        ]
      };
    } catch {
      return null;
    }
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('popularity');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('TREND20');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    localStorage.setItem('tc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tc_user');
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const navigateTo = (page: ActivePage, category?: Category) => {
    setActivePage(page);
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = (category: Category) => {
    setFilters((prev) => ({ ...prev, category }));
    if (activePage !== 'catalog') {
      setActivePage('catalog');
    }
  };

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;

  // Cart operations
  const addToCart = (
    product: Product, 
    quantity = 1, 
    size?: string, 
    color?: { name: string; hex: string }
  ) => {
    const chosenSize = size || product.sizes[0] || 'Default';
    const chosenColor = color || product.colors[0] || { name: 'Default', hex: '#000000' };

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === chosenSize && 
          item.selectedColor.hex === chosenColor.hex
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: chosenSize, selectedColor: chosenColor }];
      }
    });

    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart((prev) => 
      prev.filter(
        (item) => 
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, size: string, colorHex: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, colorHex);
      return;
    }

    setCart((prev) => 
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo code
  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo(cleanCode);
      showToast(`Promo "${cleanCode}" applied: ${PROMO_CODES[cleanCode].description}`);
      return { success: true, message: PROMO_CODES[cleanCode].description };
    } else {
      return { success: false, message: 'Invalid promo code. Try TREND20 or WELCOME10' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Cart calculations
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountRate = appliedPromo && PROMO_CODES[appliedPromo] ? PROMO_CODES[appliedPromo].discountPercent / 100 : 0;
  const cartDiscount = Math.round(cartSubtotal * discountRate);
  const cartShipping = cartSubtotal > 150 || appliedPromo === 'FREESHIP' || cartSubtotal === 0 ? 0 : 12;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Auth
  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginUser = (email: string, name?: string) => {
    const formattedName = name || email.split('@')[0].replace('.', ' ');
    setUser({
      id: 'usr-' + Date.now(),
      name: formattedName.charAt(0).toUpperCase() + formattedName.slice(1),
      email,
      phone: '+1 (555) 890-1234',
      addresses: [
        {
          id: 'addr-main',
          fullName: formattedName,
          phone: '+1 (555) 890-1234',
          street: '1200 Pearl Street, Suite 300',
          city: 'Boulder',
          state: 'CO',
          zipCode: '80302',
          country: 'United States',
          isDefault: true
        }
      ]
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${formattedName}!`);
  };

  const signupUser = (name: string, email: string) => {
    setUser({
      id: 'usr-' + Date.now(),
      name,
      email,
      addresses: []
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome to TrendCart, ${name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('You have been logged out', 'info');
  };

  // Order Placement
  const placeOrder = (shippingAddress: Address, paymentMethod: string): Order => {
    const orderId = 'TC-' + Math.floor(100000 + Math.random() * 900000);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      shippingAddress,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      status: 'Confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };

    setLastOrder(newOrder);
    setCart([]);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Order #${orderId} successfully placed!`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        activePage,
        selectedProductId,
        selectedProduct,
        selectedCategory: filters.category,
        searchQuery,
        filters,
        sortBy,
        user,
        appliedPromo,
        lastOrder,
        isAuthModalOpen,
        authModalMode,
        toasts,
        navigateTo,
        viewProduct,
        setSearchQuery,
        setCategory,
        setFilter,
        resetFilters,
        setSortBy,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        openAuthModal,
        closeAuthModal,
        loginUser,
        signupUser,
        logoutUser,
        placeOrder,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

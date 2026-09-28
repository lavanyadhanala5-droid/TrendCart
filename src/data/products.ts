import { Product } from '../types/ecommerce';

import catWomen from '../assets/images/cat_women_fashion_1790580713942.jpg';
import catMen from '../assets/images/cat_men_apparel_1790580733957.jpg';
import catAudio from '../assets/images/cat_electronics_audio_1790580749128.jpg';
import catKids from '../assets/images/cat_kids_lifestyle_1790580763456.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // WOMEN'S COLLECTION
  {
    id: 'prod-w1',
    name: 'Architectural Wool-Blend Trench Coat',
    category: 'Women',
    price: 185,
    originalPrice: 245,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 142,
    image: catWomen,
    description: 'Masterfully structured wool-blend overcoat with double-breasted closure, storm flap detailing, and a relaxed dropped-shoulder silhouette for effortless seasonal layering.',
    features: [
      '70% recycled wool, 30% organic cotton twill',
      'Water-repellent durable outer finish',
      'Horn buttons and detachable waist belt',
      'Inner satin lining with concealed chest pocket'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#D8CEBF' },
      { name: 'Onyx Black', hex: '#1C1917' },
      { name: 'Raw Olive', hex: '#585D48' }
    ],
    isBestseller: true,
    isNew: false,
    stock: 14
  },
  {
    id: 'prod-w2',
    name: 'Pure Mulberry Silk Ribbed Knit Top',
    category: 'Women',
    price: 94,
    originalPrice: 125,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Featherlight seamless ribbed mock-neck top crafted from 100% grade 6A mulberry silk. Breathable, thermo-regulating, and soft against the skin.',
    features: [
      '100% certified organic mulberry silk',
      'Seamless flatlock micro-stitching',
      'Hypoallergenic and natural temperature control',
      'Dry clean or gentle hand wash'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Midnight Charcoal', hex: '#262626' },
      { name: 'Terracotta', hex: '#A35338' }
    ],
    isBestseller: false,
    isNew: true,
    stock: 22
  },
  {
    id: 'prod-w3',
    name: 'Tailored Wide-Leg Pleated Trousers',
    category: 'Women',
    price: 110,
    originalPrice: 140,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description: 'High-waisted tailored trousers featuring crisp double front pleats, slant pockets, and a fluid drape that moves naturally from office to evening.',
    features: [
      'Poly-viscose blend with 2% elastane for subtle stretch',
      'Clean waistband with interior hook-and-eye closure',
      'Deep functional side pockets and welt back pockets',
      'Crease-resistant fluid drape'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mocha Taupe', hex: '#8B7D72' },
      { name: 'Obsidian', hex: '#18181B' },
      { name: 'Chalk White', hex: '#EAE6E1' }
    ],
    isBestseller: true,
    isNew: false,
    stock: 9
  },
  {
    id: 'prod-w4',
    name: 'Cashmere-Touch Relaxed Cardigan',
    category: 'Women',
    price: 135,
    originalPrice: 175,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 115,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: 'An oversized, cocooning cardigan knitted from an ultra-soft blend of fine Mongolian cashmere and Merino wool, accented with genuine horn buttons.',
    features: [
      '50% recycled cashmere, 50% extra-fine Merino wool',
      'Heavy 7-gauge textured shaker rib knit',
      'Dropped shoulder seam with ribbed cuffs and hem',
      'Pill-resistant sustainable yarn'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Camel', hex: '#C19A6B' },
      { name: 'Soft Heather Grey', hex: '#A8A8A8' },
      { name: 'Alabaster', hex: '#F4F1EA' }
    ],
    isBestseller: false,
    isNew: true,
    stock: 18
  },

  // MEN'S COLLECTION
  {
    id: 'prod-m1',
    name: 'Unstructured Linen-Wool Blazer',
    category: 'Men',
    price: 195,
    originalPrice: 260,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 97,
    image: catMen,
    description: 'An effortlessly sophisticated tailored jacket constructed without shoulder pads or heavy canvassing. Breathable Italian linen warp blended with supple virgin wool.',
    features: [
      '55% Italian linen, 45% virgin wool',
      'Unlined body with bound interior seams for ventilation',
      'Double back vents and patch utility pockets',
      'Notch lapel with working buttonholes'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Desert Dune', hex: '#D1C2A5' },
      { name: 'Deep Navy', hex: '#1E293B' },
      { name: 'Slate Moss', hex: '#4B5548' }
    ],
    isBestseller: true,
    isNew: false,
    stock: 12
  },
  {
    id: 'prod-m2',
    name: 'Heavyweight Supima Cotton Overshirt',
    category: 'Men',
    price: 85,
    originalPrice: 110,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 130,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Workwear-inspired utility overshirt cut from 320 GSM American-grown Supima cotton canvas. Pre-washed for a broken-in vintage feel that ages gracefully.',
    features: [
      '100% Long-staple Supima cotton canvas',
      'Dual chest bellows pockets with reinforced rivet corners',
      'Heavy-duty matte metal snap closures',
      'Bar-tack stress point reinforcement'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Tobacco Tan', hex: '#8F5C38' },
      { name: 'Washed Black', hex: '#2B2B2B' },
      { name: 'Army Olive', hex: '#3B443B' }
    ],
    isBestseller: false,
    isNew: true,
    stock: 30
  },
  {
    id: 'prod-m3',
    name: 'Japanese Selvedge Relaxed Denim',
    category: 'Men',
    price: 140,
    originalPrice: 180,
    discountPercent: 22,
    rating: 4.7,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    description: '13.5 oz shuttle-loomed Japanese selvedge denim woven in Okayama on vintage Toyoda looms. Raw indigo that develops unique, personal wear fades over time.',
    features: [
      '13.5 oz 100% organic cotton selvedge',
      'Red-line signature selvedge ID tape',
      'Custom embossed solid copper hardware',
      'Medium-rise with generous room through thigh and gentle taper'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Raw Indigo', hex: '#1B2A4A' },
      { name: 'Washed Stone', hex: '#4A5568' }
    ],
    isBestseller: true,
    isNew: false,
    stock: 15
  },
  {
    id: 'prod-m4',
    name: 'Minimalist Merino Crewneck Sweater',
    category: 'Men',
    price: 115,
    originalPrice: 145,
    discountPercent: 21,
    rating: 4.9,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    description: 'An everyday staple knit from 19.5-micron non-mulesed Australian Merino wool. Offers natural odor resistance, temperature regulation, and total itch-free softness.',
    features: [
      '100% fine Merino wool',
      'Fully-fashioned armholes for structured drape',
      'Tightly ribbed neck, cuffs, and bottom hem',
      'Machine washable on wool cycle'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal Melange', hex: '#333333' },
      { name: 'Sand Khaki', hex: '#D8CBB5' },
      { name: 'Forest Evergreen', hex: '#1C352D' }
    ],
    isBestseller: false,
    isNew: false,
    stock: 25
  },

  // ELECTRONICS & AUDIO
  {
    id: 'prod-e1',
    name: 'StudioPro Active Noise Cancelling Headphones',
    category: 'Electronics',
    price: 249,
    originalPrice: 320,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 312,
    image: catAudio,
    description: 'Audiophile-grade acoustic architecture featuring 40mm custom beryllium dynamic drivers, hybrid active noise cancellation, and 45 hours of high-resolution playback.',
    features: [
      'Custom 40mm Beryllium acoustic drivers',
      'Adaptive Hybrid ANC with transparent ambient mode',
      'Up to 45 hours battery life + fast charge (5 min = 4 hrs)',
      'Multi-point Bluetooth 5.3 with LDAC & AAC codecs'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Matte Obsidian', hex: '#171717' },
      { name: 'Anodized Silver', hex: '#D4D4D8' },
      { name: 'Midnight Navy', hex: '#0F172A' }
    ],
    isBestseller: true,
    isNew: true,
    stock: 19
  },
  {
    id: 'prod-e2',
    name: 'Crafted Solid Walnut Wireless Speaker',
    category: 'Electronics',
    price: 179,
    originalPrice: 220,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description: 'Precision acoustic chamber machined from sustainably harvested American walnut wood. Delivers room-filling 360-degree sound with rich bass and crystal-clear acoustic fidelity.',
    features: [
      'Solid FSC-certified American walnut timber casing',
      'Dual passive bass radiators + 25W class-D amplifier',
      'True Wireless Stereo pairing capability',
      'Tactile rotary volume dial with analog warm feedback'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Natural Walnut', hex: '#5D4037' },
      { name: 'Smoked Oak', hex: '#3E2723' }
    ],
    isBestseller: false,
    isNew: true,
    stock: 11
  },
  {
    id: 'prod-e3',
    name: 'Titanium Smart Health & Fitness Watch',
    category: 'Electronics',
    price: 210,
    originalPrice: 280,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 186,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Aerospace-grade titanium chassis with sapphire crystal AMOLED display. Tracks continuous heart rate, sleep stages, SpO2, and dual-frequency GPS navigation.',
    features: [
      'Grade 5 titanium unibody case with sapphire glass',
      '1.43” Always-on AMOLED display (1000 nits outdoor peak)',
      '14-day standard battery life on a single magnetic charge',
      '50m / 5 ATM water resistance for swimming and water sports'
    ],
    sizes: ['42mm', '46mm'],
    colors: [
      { name: 'Brushed Titanium', hex: '#71717A' },
      { name: 'Space Black', hex: '#18181B' }
    ],
    isBestseller: true,
    isNew: false,
    stock: 16
  },
  {
    id: 'prod-e4',
    name: 'Bespoke 3-in-1 Magnetic Wireless Charging Hub',
    category: 'Electronics',
    price: 68,
    originalPrice: 89,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpted aluminum and vegan leather desktop charging dock. Simultaneously fast charges your phone, smartwatch, and wireless earbuds with a single USB-C cable.',
    features: [
      '15W magnetic alignment fast-charging for phones',
      'Weighted zinc-alloy anti-slip base with Italian vegan leather pad',
      'Over-temperature and foreign object detection circuitry',
      'Includes 30W GaN wall adapter and braided nylon cable'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Slate Grey', hex: '#475569' },
      { name: 'Desert Sand', hex: '#CBD5E1' }
    ],
    isBestseller: false,
    isNew: false,
    stock: 35
  },

  // KIDS & YOUTH COLLECTION
  {
    id: 'prod-k1',
    name: 'Organic Cotton Scandinavian Knit Set',
    category: 'Kids',
    price: 48,
    originalPrice: 65,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 82,
    image: catKids,
    description: 'Cozy two-piece sweater and jogger set spun from 100% GOTS-certified organic cotton. Gentle on sensitive skin, scratch-free, and designed for active play.',
    features: [
      '100% GOTS-certified chemical-free organic cotton',
      'Stretchy rib waistband with soft drawstring',
      'Reinforced knee patches for extended durability',
      'Tagless neck label prevents skin irritation'
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    colors: [
      { name: 'Sage Green', hex: '#8A9A86' },
      { name: 'Honey Mustard', hex: '#D4A373' },
      { name: 'Cloud Grey', hex: '#D3D3D3' }
    ],
    isBestseller: true,
    isNew: true,
    stock: 24
  },
  {
    id: 'prod-k2',
    name: 'Weatherproof Explorer Hooded Parka',
    category: 'Kids',
    price: 72,
    originalPrice: 95,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 61,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    description: 'Windproof and water-resistant shell lined with plush recycled fleece. Built to keep young adventurers warm and dry in autumn showers and winter chills.',
    features: [
      'Recycled polyester shell with eco DWR coating',
      'Reflective 3M safety piping on sleeves and back',
      'Detachable fleece-lined hood with storm chin guard',
      'Name label inside with multi-sibling transfer fields'
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Nordic Navy', hex: '#1E3A8A' },
      { name: 'Rust Amber', hex: '#B45309' }
    ],
    isBestseller: false,
    isNew: false,
    stock: 17
  },
  {
    id: 'prod-k3',
    name: 'Heritage Canvas Daily Backpack',
    category: 'Kids',
    price: 36,
    originalPrice: 48,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 119,
    image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
    description: 'Durable cotton canvas daypack sized for children and youths. Features ergonomic padded shoulder straps, dual water bottle pockets, and an easy-pull zipper.',
    features: [
      'Heavy 16oz cotton canvas with water-resistant base',
      'Padded breathable mesh back panel and shoulder straps',
      'Interior 11" tablet sleeve and key leash',
      'Machine washable cold gentle cycle'
    ],
    sizes: ['One Size (12L)'],
    colors: [
      { name: 'Canyon Clay', hex: '#C25E40' },
      { name: 'Forest Pine', hex: '#2D4A3E' },
      { name: 'Ocean Blue', hex: '#2563EB' }
    ],
    isBestseller: true,
    isNew: true,
    stock: 28
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'Women',
    name: "Women's Collection",
    tagline: 'Refined silhouettes, natural textiles & quiet luxury',
    count: '34 Items',
    image: catWomen
  },
  {
    id: 'Men',
    name: "Men's Apparel",
    tagline: 'Modern tailoring, Japanese selvedge & durable essentials',
    count: '28 Items',
    image: catMen
  },
  {
    id: 'Electronics',
    name: 'Audio & Lifestyle Tech',
    tagline: 'Studio-grade acoustics, titanium wearables & desktop hubs',
    count: '16 Items',
    image: catAudio
  },
  {
    id: 'Kids',
    name: 'Kids & Youth',
    tagline: 'Organic cotton knits, weatherproof parkas & backpacks',
    count: '19 Items',
    image: catKids
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  TREND20: { discountPercent: 20, description: '20% off your entire order' },
  WELCOME10: { discountPercent: 10, description: '10% welcome bonus for new members' },
  FREESHIP: { discountPercent: 0, description: 'Free express shipping on all orders' }
};

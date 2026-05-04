export const products = [
  {
    id: 'business-card-standard',
    categorySlug: 'business-cards',
    slug: 'standard-business-card',
    name: 'Standard Business Card',
    description: '3.5 x 2 inch full-color business card with bleed guides.',
    basePriceCents: 1800,
    previewImageUrl: '/images/products/business-card.svg',
    printWidthIn: 3.5,
    printHeightIn: 2,
    bleedIn: 0.125,
    dpi: 300,
    variants: [
      { id: 'bc-finish-matte', name: 'Matte', optionType: 'finish', optionValue: 'matte', priceDeltaCents: 0 },
      { id: 'bc-finish-gloss', name: 'Gloss', optionType: 'finish', optionValue: 'gloss', priceDeltaCents: 300 },
      { id: 'bc-paper-16pt', name: 'Premium 16pt', optionType: 'material', optionValue: '16pt', priceDeltaCents: 500 }
    ]
  },
  {
    id: 'poster-18x24',
    categorySlug: 'posters',
    slug: 'poster-18x24',
    name: 'Poster 18 x 24',
    description: 'Sharp large-format poster print for campaigns and decor.',
    basePriceCents: 2400,
    previewImageUrl: '/images/products/poster.svg',
    printWidthIn: 18,
    printHeightIn: 24,
    bleedIn: 0.125,
    dpi: 300,
    variants: [
      { id: 'poster-satin', name: 'Satin', optionType: 'finish', optionValue: 'satin', priceDeltaCents: 0 },
      { id: 'poster-matte', name: 'Matte', optionType: 'finish', optionValue: 'matte', priceDeltaCents: 200 }
    ]
  },
  {
    id: 'tee-classic',
    categorySlug: 't-shirts',
    slug: 'classic-t-shirt',
    name: 'Classic T-Shirt',
    description: 'Soft cotton tee with front print area.',
    basePriceCents: 2200,
    previewImageUrl: '/images/products/t-shirt.svg',
    printWidthIn: 12,
    printHeightIn: 14,
    bleedIn: 0,
    dpi: 300,
    variants: [
      { id: 'tee-s', name: 'Small', optionType: 'size', optionValue: 'S', priceDeltaCents: 0 },
      { id: 'tee-m', name: 'Medium', optionType: 'size', optionValue: 'M', priceDeltaCents: 0 },
      { id: 'tee-l', name: 'Large', optionType: 'size', optionValue: 'L', priceDeltaCents: 100 }
    ]
  },
  {
    id: 'mug-11oz',
    categorySlug: 'mugs',
    slug: 'ceramic-mug-11oz',
    name: 'Ceramic Mug 11oz',
    description: 'Dishwasher-safe mug with full-color wrap print.',
    basePriceCents: 1600,
    previewImageUrl: '/images/products/mug.svg',
    printWidthIn: 8.5,
    printHeightIn: 3.5,
    bleedIn: 0.0625,
    dpi: 300,
    variants: [
      { id: 'mug-white', name: 'White', optionType: 'color', optionValue: 'white', priceDeltaCents: 0 },
      { id: 'mug-rim', name: 'Black Rim', optionType: 'color', optionValue: 'black-rim', priceDeltaCents: 250 }
    ]
  }
];

export const categories = [
  { id: 'business-cards', slug: 'business-cards', name: 'Business Cards', products: products.filter((p) => p.categorySlug === 'business-cards') },
  { id: 'posters', slug: 'posters', name: 'Posters', products: products.filter((p) => p.categorySlug === 'posters') },
  { id: 't-shirts', slug: 't-shirts', name: 'T-Shirts', products: products.filter((p) => p.categorySlug === 't-shirts') },
  { id: 'mugs', slug: 'mugs', name: 'Mugs', products: products.filter((p) => p.categorySlug === 'mugs') }
];

export const templates = [
  {
    id: 'modern-card-template',
    productId: 'business-card-standard',
    name: 'Modern Consultant',
    thumbnailUrl: '/images/templates/modern-card.svg',
    fabricJson: {
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1050, height: 600, fill: '#f7f8f3', selectable: false },
        { type: 'rect', left: 0, top: 0, width: 300, height: 600, fill: '#1f6f68' },
        { type: 'textbox', left: 360, top: 120, width: 520, text: 'Avery Stone', fontSize: 62, fontFamily: 'Inter', fill: '#18211f', fontWeight: '700' },
        { type: 'textbox', left: 365, top: 210, width: 440, text: 'Brand Strategy', fontSize: 30, fontFamily: 'Inter', fill: '#1f6f68' },
        { type: 'textbox', left: 365, top: 405, width: 500, text: 'avery@example.com\n+1 555 0188', fontSize: 26, fontFamily: 'Inter', fill: '#35423f' }
      ]
    }
  },
  {
    id: 'launch-poster-template',
    productId: 'poster-18x24',
    name: 'Launch Poster',
    thumbnailUrl: '/images/templates/launch-poster.svg',
    fabricJson: {
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1800, height: 2400, fill: '#fff7ed', selectable: false },
        { type: 'rect', left: 120, top: 120, width: 1560, height: 380, fill: '#d1495b' },
        { type: 'textbox', left: 170, top: 185, width: 1200, text: 'SPRING MARKET', fontSize: 150, fontFamily: 'Inter', fill: '#ffffff', fontWeight: '800' },
        { type: 'textbox', left: 160, top: 760, width: 1250, text: 'Local makers, fresh food, live music', fontSize: 94, fontFamily: 'Inter', fill: '#233d4d' },
        { type: 'textbox', left: 160, top: 1940, width: 800, text: 'Saturday 10 AM\nDowntown Square', fontSize: 78, fontFamily: 'Inter', fill: '#233d4d' }
      ]
    }
  }
];

export const tshirtProducts = [
  {
    id: 'classic-crew',
    title: 'Classic Crew Neck T-Shirt',
    price: 449,
    rating: 4.8,
    image: '/images/products/t-shirt.svg',
    delivery: 'Free delivery by Monday, May 18',
    description: 'Everyday cotton tee with a smooth front print surface.',
    colors: ['White', 'Black', 'Navy', 'Heather Gray']
  },
  {
    id: 'premium-soft',
    title: 'Premium Soft Cotton T-Shirt',
    price: 599,
    rating: 4.7,
    image: '/images/products/t-shirt.svg',
    delivery: 'Express delivery available from Friday, May 15',
    description: 'Softer handfeel, retail fit, and richer color options.',
    colors: ['White', 'Charcoal', 'Forest', 'Maroon']
  },
  {
    id: 'event-pack',
    title: 'Event Team T-Shirt',
    price: 399,
    rating: 4.6,
    image: '/images/products/t-shirt.svg',
    delivery: 'Bulk orders ship in 5 business days',
    description: 'Reliable bulk tee for teams, volunteers, and staff.',
    colors: ['White', 'Royal Blue', 'Red', 'Black']
  },
  {
    id: 'longline-tee',
    title: 'Modern Longline T-Shirt',
    price: 649,
    rating: 4.5,
    image: '/images/products/t-shirt.svg',
    delivery: 'Estimated delivery by Tuesday, May 19',
    description: 'A sharper silhouette for merch drops and creator brands.',
    colors: ['White', 'Black', 'Olive', 'Stone']
  }
];

export function getTshirtProduct(id) {
  return tshirtProducts.find((product) => product.id === id);
}

export const quantities = [10, 25, 50, 100, 250, 500];
export const stockOptions = [
  { id: 'Standard', label: 'Standard', delta: 0 },
  { id: 'Premium', label: 'Premium', delta: 120 }
];

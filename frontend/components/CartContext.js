'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const initialDesign = {
  productId: null,
  productTitle: '',
  productImage: '',
  uploadedImage: '',
  designArea: 'Full',
  quantity: 25,
  color: 'White',
  side: 'Front',
  stock: 'Standard'
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [design, setDesignState] = useState(initialDesign);

  useEffect(() => {
    const stored = window.localStorage.getItem('vistaprint_tshirt_flow');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setCart(parsed.cart || []);
      setDesignState({ ...initialDesign, ...(parsed.design || {}) });
    } catch {
      window.localStorage.removeItem('vistaprint_tshirt_flow');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('vistaprint_tshirt_flow', JSON.stringify({ cart, design }));
  }, [cart, design]);

  const value = useMemo(
    () => ({
      cart,
      design,
      setDesign(updates) {
        setDesignState((current) => ({ ...current, ...updates }));
      },
      resetDesign() {
        setDesignState(initialDesign);
      },
      addToCart(item) {
        setCart((current) => [
          ...current,
          {
            lineId: crypto.randomUUID(),
            productId: item.productId,
            designImage: item.designImage,
            quantity: item.quantity,
            variant: item.variant,
            productTitle: item.productTitle,
            color: item.color,
            price: item.price
          }
        ]);
      },
      removeFromCart(lineId) {
        setCart((current) => current.filter((item) => item.lineId !== lineId));
      }
    }),
    [cart, design]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartFlow() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartFlow must be used inside CartProvider');
  }
  return context;
}

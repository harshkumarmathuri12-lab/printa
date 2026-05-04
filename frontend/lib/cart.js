import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('vistaclone_cart');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('vistaclone_cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem(item) {
        setItems((current) => [...current, { ...item, id: crypto.randomUUID() }]);
      },
      removeItem(itemId) {
        setItems((current) => current.filter((item) => item.id !== itemId));
      },
      clear() {
        setItems([]);
      }
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

import { createContext, useContext, useMemo, useState } from 'react';

const CurrencyContext = createContext(null);

const USD_TO_INR_RATE = 83;

export function formatINR(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

export function formatUSD(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price / USD_TO_INR_RATE);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice(price) {
        return currency === 'USD' ? formatUSD(price) : formatINR(price);
      }
    }),
    [currency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

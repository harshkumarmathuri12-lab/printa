import '../styles/globals.css';
import { AuthProvider } from '../lib/auth';
import { CartProvider } from '../lib/cart';
import { CurrencyProvider } from '../lib/currency';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

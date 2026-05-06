import '../styles/globals.css';
import { CartProvider } from '../components/CartContext';

export const metadata = {
  title: 'Printa T-Shirt Builder',
  description: 'Custom T-shirt design and cart flow'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

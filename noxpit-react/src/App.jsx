import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/Toast';
import { useScrollReveal } from './hooks/useScrollReveal';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Categories from './components/Categories';
import Products from './components/Products';
import Brand from './components/Brand';
import Packaging from './components/Packaging';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import ProductsList from './pages/ProductsList';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Addresses from './pages/Addresses';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import ProtectedRoute from './components/ProtectedRoute';

function Landing() {
  useScrollReveal();
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Brand />
      <Packaging />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <Nav />
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                  </Routes>
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Categories from './components/Categories';
import Products from './components/Products';
import Brand from './components/Brand';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';

function Landing() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Brand />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

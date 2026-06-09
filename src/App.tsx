import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';

import { useAdminStore } from './store/adminStore';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Equipment } from './pages/Equipment.tsx';
import { Contact } from './pages/Contact.tsx';
import { NewsReviews } from './pages/NewsReviews';
import { ModalProvider } from './contexts/ModalContext';

import { AdminLayout } from './components/layout/AdminLayout';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCombos } from './pages/admin/AdminCombos';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminImages } from './pages/admin/AdminImages';
import { AdminNewsReviews } from './pages/admin/AdminNewsReviews';

function App() {
  const fetchProducts = useAdminStore(state => state.fetchProducts);
  const fetchCombos = useAdminStore(state => state.fetchCombos);
  const fetchInquiries = useAdminStore(state => state.fetchInquiries);
  const cleanupSoldProducts = useAdminStore(state => state.cleanupSoldProducts);

  useEffect(() => {
    fetchProducts();
    fetchCombos();
    fetchInquiries();
    cleanupSoldProducts();
  }, [fetchProducts, fetchCombos, fetchInquiries, cleanupSoldProducts]);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ModalProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="contact" element={<Contact />} />
            <Route path="reviews" element={<NewsReviews />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProducts />} /> {/* Default to Products for now */}
            <Route path="products" element={<AdminProducts />} />
            <Route path="combos" element={<AdminCombos />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="images" element={<AdminImages />} />
            <Route path="news" element={<AdminNewsReviews />} />
          </Route>
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;

import { Outlet, useLocation } from 'react-router-dom';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';
import { GetQuoteModal } from '../modals/GetQuoteModal';
import { OfferModal } from '../modals/OfferModal';
import { ProductDetailModal } from '../modals/ProductDetailModal';
import { ReadMoreModal } from '../modals/ReadMoreModal';

export function Layout() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <TopBanner />
            <Navbar />
            <main className={`flex-grow ${isHome ? '' : 'pt-28 relative z-10'}`}> {/* pt-48 cleanly clears TopBanner + Floating Pill Navbar on non-home pages */}
                <Outlet />
            </main>
            <Footer />
            <FloatingActions />
            <GetQuoteModal />
            <OfferModal />
            <ProductDetailModal />
            <ReadMoreModal />
        </div>
    );
}

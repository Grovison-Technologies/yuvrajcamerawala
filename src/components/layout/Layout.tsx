import { Outlet } from 'react-router-dom';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';
import { GetQuoteModal } from '../modals/GetQuoteModal';
import { OfferModal } from '../modals/OfferModal';
import { ProductDetailModal } from '../modals/ProductDetailModal';
import { ReadMoreModal } from '../modals/ReadMoreModal';

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <TopBanner />
            <Navbar />
            <main className="flex-grow pt-28"> {/* pt-28 accounts for TopBanner (32px) + Navbar height */}
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

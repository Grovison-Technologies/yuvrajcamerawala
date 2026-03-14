import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useModal } from '../../contexts/ModalContext';

const links = [
    { name: 'HOME', path: '/' },
    { name: 'OUR GEAR', path: '/equipment' },
    { name: 'NEWS & REVIEWS', path: '/reviews' },
    { name: 'CONTACT', path: '/contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-8 inset-x-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                    scrolled || mobileMenuOpen ? "bg-white/90 backdrop-blur-md border-gray-100 shadow-sm" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-brand-700 transition-colors">
                                <ShoppingBag size={20} />
                            </div>
                            <span className={cn(
                                "font-black text-lg md:text-xl tracking-tighter uppercase transition-colors whitespace-nowrap",
                                scrolled || mobileMenuOpen ? "text-gray-900" : "text-gray-900" // adjust this based on Hero overlay
                            )}>
                                Yuvraj <span className="text-brand-600">Camera Wala</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-sm font-semibold tracking-widest transition-colors hover:text-brand-600",
                                        location.pathname === link.path
                                            ? "text-brand-600"
                                            : (scrolled ? "text-gray-800" : "text-gray-900") // Assume light theme default for hero too, or black text everywhere
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex">
                            <button onClick={() => openModal('quote')} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wider transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
                                <Phone size={16} />
                                GET QUOTE
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={cn(
                                    "p-2 rounded-md transition-colors",
                                    scrolled || mobileMenuOpen ? "text-gray-900 hover:bg-gray-100" : "text-gray-900 hover:bg-white/20"
                                )}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white pt-32 px-4 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6 items-center pt-10">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-2xl font-black tracking-widest",
                                        location.pathname === link.path ? "text-brand-600" : "text-gray-900"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-8 w-full max-w-xs">
                                <button onClick={() => openModal('quote')} className="w-full bg-brand-600 text-white py-4 rounded-full font-bold text-lg tracking-wider flex items-center justify-center gap-2 shadow-lg">
                                    <Phone size={20} />
                                    GET A QUOTE NOW
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

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
            <header className="fixed top-12 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
                <div
                    className={cn(
                        "pointer-events-auto transition-all duration-500 ease-in-out border rounded-full px-6 py-3",
                        scrolled || mobileMenuOpen
                            ? "bg-white/80 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                            : "bg-black/20 backdrop-blur-md border-white/10 shadow-lg"
                    )}
                >
                    <div className="flex items-center justify-between gap-8 md:gap-16">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-brand-500 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(var(--brand-600),0.5)]">
                                <ShoppingBag size={18} />
                            </div>
                            <span className={cn(
                                "font-black text-lg md:text-xl tracking-tighter uppercase transition-colors whitespace-nowrap hidden sm:block",
                                scrolled || mobileMenuOpen ? "text-gray-900" : "text-white"
                            )}>
                                Yuvraj <span className="text-brand-500">Camera</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-xs font-bold tracking-widest transition-colors relative group",
                                        location.pathname === link.path
                                            ? "text-brand-500"
                                            : (scrolled ? "text-gray-600 hover:text-brand-600" : "text-gray-700 hover:text-white")
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full",
                                        location.pathname === link.path ? "w-full" : "w-0"
                                    )}></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex">
                            <button onClick={() => openModal('quote')} className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(var(--brand-600),0.3)] flex items-center gap-2">
                                <Phone size={14} />
                                GET QUOTE
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    scrolled || mobileMenuOpen ? "text-gray-900 bg-gray-100/50 hover:bg-gray-200" : "text-white bg-white/10 hover:bg-white/20"
                                )}
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-32 px-4 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6 items-center pt-10">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-2xl font-black tracking-widest transition-colors",
                                        location.pathname === link.path ? "text-brand-500" : "text-white hover:text-brand-400"
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

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
    "FREE SHIPPING ON ALL ORDERS OVER ₹50,000",
    "PRE-ORDER THE NEW SONY ALPHA SERIES NOW",
    "GET 10% OFF YOUR FIRST LENS PURCHASE",
];

export function TopBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed top-0 inset-x-0 z-[60] bg-brand-600 text-white text-xs font-medium tracking-wider py-2 overflow-hidden flex justify-center items-center h-8">
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                >
                    {messages[currentIndex]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

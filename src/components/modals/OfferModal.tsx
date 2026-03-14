import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../contexts/ModalContext';

export function OfferModal() {
    const { activeModal, closeModal } = useModal();
    const isOpen = activeModal === 'offer';

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden text-center"
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="bg-brand-50 py-10 px-8 flex justify-center border-b border-brand-100">
                        <div className="w-20 h-20 bg-brand-600 text-white rounded-full flex items-center justify-center animate-bounce">
                            <Gift size={40} />
                        </div>
                    </div>

                    <div className="p-8">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">Special Offer!</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Get an exclusive <span className="font-bold text-brand-600">Free Lens Filter Kit</span> with any mirrorless camera purchase this week.
                        </p>
                        <button
                            onClick={closeModal}
                            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold tracking-wider uppercase hover:bg-black transition-colors shadow-lg"
                        >
                            CLAIM OFFER NOW
                        </button>
                        <p className="text-xs text-gray-400 mt-4">*Terms and conditions apply.</p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

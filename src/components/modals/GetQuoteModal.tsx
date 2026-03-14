import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../contexts/ModalContext';

export function GetQuoteModal() {
    const { activeModal, closeModal, modalData } = useModal();
    const isOpen = activeModal === 'quote';

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-brand-600 px-6 py-6 text-white flex justify-between items-center shrink-0">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-wider">Request Quote</h2>
                            {(modalData as { productName?: string })?.productName && (
                                <p className="text-brand-100 text-sm mt-1">For: {(modalData as { productName?: string }).productName}</p>
                            )}
                        </div>
                        <button
                            onClick={closeModal}
                            className="bg-brand-700 hover:bg-brand-800 p-2 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 overflow-y-auto">
                        <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Full Name</label>
                                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Phone</label>
                                        <input type="tel" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="+91..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Email</label>
                                        <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="abc@xyz.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Requirements / Custom Setup</label>
                                    <textarea rows={3} defaultValue={(modalData as { productName?: string })?.productName ? `I am interested in getting a quote for the ${(modalData as { productName?: string }).productName}.` : ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors resize-none" placeholder="Details about your requirements..."></textarea>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="w-full bg-brand-600 text-white font-bold tracking-wider uppercase py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-brand-700 transition-colors shadow-md">
                                    SUBMIT REQUEST <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

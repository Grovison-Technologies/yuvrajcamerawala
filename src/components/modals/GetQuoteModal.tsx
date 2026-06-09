import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../contexts/ModalContext';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function GetQuoteModal() {
    const { activeModal, closeModal, modalData } = useModal();
    const isOpen = activeModal === 'quote';

    const productName = (modalData as { productName?: string })?.productName || '';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [requirements, setRequirements] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && productName) {
            setRequirements(`I am interested in getting a quote for the ${productName}.`);
        } else if (isOpen) {
            setRequirements('');
        }
    }, [isOpen, productName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 1. Save to Supabase
        await supabase.from('inquiries').insert([{
            name,
            phone,
            email,
            requirements,
            productName: productName || null,
            status: 'new'
        }]);

        setIsSubmitting(false);

        // 2. Redirect to WhatsApp
        const waNumber = '919876543210'; // Replace with real number
        const message = `Hello Yuvraj Camera Wala!\n\nMy name is ${name}.\n${productName ? `I am inquiring about: *${productName}*\n\n` : ''}Requirements: ${requirements}\n\nEmail: ${email}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');

        // 3. Reset and Close
        setName('');
        setPhone('');
        setEmail('');
        setRequirements('');
        closeModal();
    };

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
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Full Name</label>
                                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Phone</label>
                                        <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="+91..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Email</label>
                                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="abc@xyz.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Requirements / Custom Setup</label>
                                    <textarea rows={3} value={requirements} onChange={e => setRequirements(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors resize-none" placeholder="Details about your requirements..."></textarea>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button disabled={isSubmitting} type="submit" className="w-full bg-brand-600 text-white font-bold tracking-wider uppercase py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-brand-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'PROCESSING...' : 'SUBMIT REQUEST'} <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

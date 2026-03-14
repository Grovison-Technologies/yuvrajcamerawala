import { MessageCircle, Gift } from 'lucide-react';
import { useModal } from '../../contexts/ModalContext';

export function FloatingActions() {
    const { openModal } = useModal();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
            {/* Gift / Offer Button */}
            <button
                className="group relative flex items-center justify-center p-3 rounded-full bg-white shadow-lg border border-gray-100 
          hover:bg-gray-50 transition-all transform hover:-translate-y-1 hover:shadow-xl text-brand-600"
                onClick={() => openModal('offer')}
            >
                <Gift size={24} className="group-hover:animate-pulse" />
                <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-3 py-1.5 rounded-lg shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Special Offers
                </span>
            </button>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center p-3 rounded-full bg-[#25D366] text-white shadow-lg 
          hover:bg-[#1ebd5c] transition-all transform hover:-translate-y-1 hover:shadow-xl"
            >
                <MessageCircle size={28} />
                <span className="absolute right-full mr-4 bg-[#25D366] text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Chat on WhatsApp
                </span>
            </a>
        </div>
    );
}

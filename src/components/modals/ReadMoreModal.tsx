import { useModal } from '../../contexts/ModalContext';
import { NewsReview } from '../../store/adminStore';
import { X, Star } from 'lucide-react';

export function ReadMoreModal() {
    const { activeModal, modalData, closeModal } = useModal();

    if (activeModal !== 'read-more' || !modalData) return null;

    const item = modalData as NewsReview;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>

            <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Optional Header Image */}
                {item.image && (
                    <div className="w-full h-64 sm:h-80 bg-gray-100 relative">
                        <img src={item.image} alt="Header" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="p-6 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                        {item.rating === 0 ? (
                            <span className="bg-brand-600 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-sm">
                                LATEST NEWS
                            </span>
                        ) : (
                            <div className="flex gap-1 text-yellow-400">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={18} fill={idx < item.rating ? "currentColor" : "none"} className={idx >= item.rating ? "text-gray-300" : ""} />
                                ))}
                            </div>
                        )}
                    </div>

                    <p className="text-gray-800 text-lg sm:text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap">
                        "{item.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xl uppercase">
                            {item.author.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-base">{item.author}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{item.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

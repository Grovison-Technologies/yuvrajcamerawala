import { useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { Product } from '../../store/adminStore';
import { X, ChevronLeft, ChevronRight, Phone, Star, Check, Shield } from 'lucide-react';

export function ProductDetailModal() {
    const { activeModal, modalData, closeModal, openModal } = useModal();
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    if (activeModal !== 'product-detail' || !modalData) return null;

    const product = modalData as Product;

    // Use product images if available, otherwise fallback to the primary image
    const gallery = product.images?.length ? product.images : [
        product.image,
    ];

    const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % gallery.length);
    const prevImage = () => setCurrentImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-900 border border-gray-200 transition-colors shadow-sm"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image Gallery (Amazon Style) */}
                <div className="w-full md:w-1/2 flex flex-col bg-gray-50 border-r border-gray-100 p-6 min-h-[300px] md:min-h-full justify-center">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-white border border-gray-100 group">
                        <img src={gallery[currentImageIdx]} alt={product.name} className="w-[80%] h-[80%] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-125 cursor-zoom-in" />

                        {/* Arrows */}
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} />
                        </button>

                        {product.isNew && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-brand-600 text-white text-xs font-bold tracking-widest uppercase rounded shadow-sm">
                                NEW ARRIVAL
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIdx(idx)}
                                className={`w-16 h-16 shrink-0 rounded-lg border-2 overflow-hidden bg-white p-1 transition-colors ${currentImageIdx === idx ? 'border-brand-600 shadow-sm' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover rounded mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 p-6 md:p-10 md:overflow-y-auto">
                    <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-2">{product.category}</div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4">{product.name}</h2>

                    {/* Rating Bar */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} className={i >= product.rating ? "text-gray-300" : ""} />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-brand-600 hover:underline cursor-pointer">Read reviews</span>
                    </div>

                    {/* Price Block */}
                    <div className="mb-8">
                        <div className="flex flex-wrap items-end gap-3 mb-2">
                            <span className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">{product.price}</span>
                            <span className="text-sm text-gray-500 font-medium mb-1 line-through opacity-60">
                                {product.oldPrice || `₹${parseInt(product.price.replace(/[^0-9]/g, '')) + 25000}`}
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                            <Check size={12} strokeWidth={3} /> IN STOCK (READY TO SHIP)
                        </span>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                        <p className="whitespace-pre-wrap">{product.longDesc || product.desc}</p>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center gap-2 font-medium"><Shield size={16} className="text-brand-500" /> 2 Years Brand Warranty</li>
                            <li className="flex items-center gap-2 font-medium"><Check size={16} className="text-brand-500" /> 7 Days Replacement Policy</li>
                            <li className="flex items-center gap-2 font-medium"><Check size={16} className="text-brand-500" /> GST Invoice Available</li>
                        </ul>
                    </div>

                    {/* Action Block */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Interested in this item?</h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    closeModal();
                                    openModal('quote', { productName: product.name });
                                }}
                                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Phone size={18} /> INQUIRE NOW
                            </button>
                            <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-all shadow-sm">
                                ADD TO WISHLIST
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

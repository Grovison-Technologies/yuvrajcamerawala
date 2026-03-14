import { Star } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { useModal } from '../contexts/ModalContext';

export function NewsReviews() {
    const { newsReviews } = useAdminStore();
    const { openModal } = useModal();

    return (
        <div className="min-h-screen bg-zinc-50 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-4">News & Reviews</h1>
                    <p className="text-gray-500 font-medium max-w-2xl text-base md:text-lg">Stay updated with the latest drops, exclusive events, and community reviews.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {newsReviews.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full">
                            {/* Header image if present */}
                            {item.image && (
                                <div className="h-48 w-full overflow-hidden bg-gray-100 relative shrink-0">
                                    <img src={item.image} alt="News Preview" className="w-full h-full object-cover" />
                                    {item.rating === 0 && (
                                        <div className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded shadow-sm">
                                            NEWS
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="p-6 flex flex-col flex-1">
                                {!item.image && item.rating === 0 && (
                                    <div className="mb-4 inline-block bg-brand-600/10 text-brand-700 text-[10px] font-bold tracking-widest px-2 py-1 rounded self-start shrink-0">
                                        NEWS
                                    </div>
                                )}

                                {/* Review Stars */}
                                {item.rating > 0 && (
                                    <div className="flex gap-1 text-yellow-400 mb-4 shrink-0">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={14} fill={idx < item.rating ? "currentColor" : "none"} className={idx >= item.rating ? "text-gray-300" : ""} />
                                        ))}
                                    </div>
                                )}

                                <p className="text-gray-700 font-medium line-clamp-4 leading-relaxed flex-1 mb-6">"{item.content}"</p>

                                <div className="mt-auto shrink-0 border-t border-gray-100 pt-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{item.author}</div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{item.role}</div>
                                        </div>
                                        <button
                                            onClick={() => openModal('read-more', item)}
                                            className="text-xs font-bold text-brand-600 hover:text-brand-800 tracking-wider transition-colors inline-block"
                                        >
                                            VIEW MORE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {newsReviews.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            No news or reviews available right now.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

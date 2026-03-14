import { useState } from 'react';
import { useAdminStore, NewsReview } from '../../store/adminStore';
import { Plus, Edit2, Trash2, Megaphone, Star } from 'lucide-react';

export function AdminNewsReviews() {
    const { newsReviews, addNewsReview, updateNewsReview, deleteNewsReview } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsReview | null>(null);

    const handleEdit = (item: NewsReview) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">News & Reviews</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage the scrolling news ticker and testimonials.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wider flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} /> ADD ITEM
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Content</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Author details</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {newsReviews.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.rating === 0 ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase">
                                                <Megaphone size={12} /> News
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase">
                                                <Star size={12} fill="currentColor" /> Review ({item.rating})
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {item.image && (
                                                <img src={item.image} alt="" className="w-10 h-10 rounded object-cover border border-gray-200" />
                                            )}
                                            <div className="text-sm text-gray-900 font-medium max-w-sm line-clamp-2">"{item.content}"</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{item.author}</div>
                                        <div className="text-xs text-gray-500">{item.role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(item)} className="text-brand-600 hover:text-brand-900 mr-4">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteNewsReview(item.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {newsReviews.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No items found. Add news or a review to display on the home screen.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <NewsReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    item={editingItem}
                    onSave={(data) => {
                        if (editingItem) {
                            updateNewsReview(editingItem.id, data);
                        } else {
                            addNewsReview(data);
                        }
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function NewsReviewModal({ isOpen, onClose, item, onSave }: {
    isOpen: boolean; onClose: () => void; item: NewsReview | null; onSave: (data: Omit<NewsReview, 'id'>) => void
}) {
    const [formData, setFormData] = useState({
        rating: item?.rating || 0, // 0 means News, > 0 means Review
        content: item?.content || '',
        author: item?.author || '',
        role: item?.role || '',
        image: item?.image || '',
    });

    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'upload img');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dqq02jdo1/image/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await response.json();
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image: data.secure_url }));
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                        {item ? 'Edit Item' : 'Add News/Review'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Type Toggle */}
                        <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: 0, author: formData.author || 'Yuvraj Admin', role: formData.role || 'Store' })}
                                className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${formData.rating === 0 ? 'bg-white shadow text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                News Update
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: 5, author: formData.author === 'Yuvraj Admin' ? '' : formData.author, role: formData.role === 'Store' ? '' : formData.role })}
                                className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${formData.rating > 0 ? 'bg-white shadow text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Customer Review
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message Content</label>
                            <textarea required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" rows={3} placeholder={formData.rating === 0 ? "e.g. 🔥 HUGE SALE TOMORROW!" : "e.g. The best camera store..."} />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL (Optional)</label>
                            <div className="flex gap-2">
                                <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center shrink-0 border border-gray-300">
                                    {isUploading ? 'Uploading...' : 'Upload File'}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Author Name</label>
                                <input required type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. John D." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Author Role</label>
                                <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Filmmaker" />
                            </div>
                        </div>

                        {formData.rating > 0 && (
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Star Rating (1-5)</label>
                                <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" />
                            </div>
                        )}

                        <div className="pt-4 flex gap-3">
                            <button type="button" onClick={onClose} className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider">Cancel</button>
                            <button type="submit" className="flex-1 py-2 px-4 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 uppercase tracking-wider">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

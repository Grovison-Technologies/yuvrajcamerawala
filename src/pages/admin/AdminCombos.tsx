import { useState } from 'react';
import { useAdminStore, ComboDeal } from '../../store/adminStore';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function AdminCombos() {
    const { combos, deleteCombo, addCombo, updateCombo } = useAdminStore();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCombo, setEditingCombo] = useState<ComboDeal | null>(null);

    const filteredCombos = combos.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (combo: ComboDeal) => {
        setEditingCombo(combo);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingCombo(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Combo Deals</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wider flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} /> ADD COMBO
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search combos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Total Combos: {combos.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Combo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Prices</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCombos.map((combo) => (
                                <tr key={combo.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 relative">
                                                <img className="h-10 w-10 rounded-md object-cover border border-gray-200" src={combo.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{combo.name}</div>
                                                <div className="text-xs text-gray-500 truncate w-48">{combo.desc}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-brand-600">{combo.discountedPrice}</div>
                                        <div className="text-xs text-gray-500 line-through">{combo.originalPrice}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {combo.isFeatured ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800">
                                                FEATURED
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                STANDARD
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(combo)} className="text-brand-600 hover:text-brand-900 mr-4">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteCombo(combo.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCombos.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No combos found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <ComboModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    combo={editingCombo}
                    onSave={(data) => {
                        if (editingCombo) {
                            updateCombo(editingCombo.id, data);
                        } else {
                            addCombo(data);
                        }
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function ComboModal({ isOpen, onClose, combo, onSave }: {
    isOpen: boolean; onClose: () => void; combo: ComboDeal | null; onSave: (data: Omit<ComboDeal, 'id'>) => void
}) {
    const [formData, setFormData] = useState({
        name: combo?.name || '',
        originalPrice: combo?.originalPrice || '',
        discountedPrice: combo?.discountedPrice || '',
        desc: combo?.desc || '',
        image: combo?.image || '',
        isFeatured: combo?.isFeatured || false,
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
                setFormData(prev => ({
                    ...prev,
                    image: data.secure_url,
                }));
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
                        {combo ? 'Edit Combo' : 'Add New Combo'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Combo Name</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Wedding Filmmaker Kit" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Original Price</label>
                                <input required type="text" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. ₹4,50,000" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Discounted Price</label>
                                <input required type="text" value={formData.discountedPrice} onChange={e => setFormData({ ...formData, discountedPrice: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. ₹3,99,000" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                            <div className="flex gap-2">
                                <input required type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center shrink-0 border border-gray-300">
                                    {isUploading ? 'Uploading...' : 'Upload Image'}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                </label>
                            </div>
                            {formData.image && (
                                <div className="mt-2 relative w-12 h-12 shrink-0 border rounded overflow-hidden">
                                    <img src={formData.image} className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                            <textarea required value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" rows={3} placeholder="What's included in this combo..." />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} className="rounded text-brand-600 focus:ring-brand-500" />
                            <label htmlFor="isFeatured" className="text-sm text-gray-700 font-medium">Mark as Featured Deal</label>
                        </div>

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

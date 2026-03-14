import { useState } from 'react';
import { useAdminStore, Product } from '../../store/adminStore';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function AdminProducts() {
    const { products, deleteProduct, addProduct, updateProduct } = useAdminStore();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Products</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wider flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} /> ADD PRODUCT
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Total Products: {products.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 relative">
                                                <img className="h-10 w-10 rounded-md object-cover border border-gray-200" src={product.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 truncate w-48">{product.desc}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.isNew ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-brand-100 text-brand-700">
                                                NEW
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                STANDARD
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(product)} className="text-brand-600 hover:text-brand-900 mr-4">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Simple Form Modal Component integrated inline to save time */}
            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={editingProduct}
                    onSave={(data) => {
                        if (editingProduct) {
                            updateProduct(editingProduct.id, data);
                        } else {
                            addProduct(data);
                        }
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function ProductModal({ isOpen, onClose, product, onSave }: {
    isOpen: boolean; onClose: () => void; product: Product | null; onSave: (data: Omit<Product, 'id'>) => void
}) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || 'Mirrorless',
        price: product?.price || '',
        oldPrice: product?.oldPrice || '',
        desc: product?.desc || '',
        longDesc: product?.longDesc || '',
        image: product?.image || '',
        images: product?.images || [],
        isNew: product?.isNew || false,
        rating: product?.rating || 5,
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
                    image: prev.image ? prev.image : data.secure_url,
                    images: [...(prev.images || []), data.secure_url]
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
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Name</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Sony FX3" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none">
                                    <option>Mirrorless</option>
                                    <option>DSLR</option>
                                    <option>Lenses</option>
                                    <option>Drones</option>
                                    <option>Lighting</option>
                                    <option>Action Cameras</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sale Price</label>
                                <input required type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. ₹2,99,990" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">MRP / Old Price (Optional)</label>
                            <input type="text" value={formData.oldPrice} onChange={e => setFormData({ ...formData, oldPrice: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. ₹3,20,000" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Image URL</label>
                            <div className="flex gap-2">
                                <input required type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center shrink-0 border border-gray-300">
                                    {isUploading ? 'Uploading...' : 'Upload Image'}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                </label>
                            </div>

                            {formData.images && formData.images.length > 0 && (
                                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative w-12 h-12 shrink-0 border rounded overflow-hidden">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== idx) }))} className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center text-[10px]">&times;</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Short Description</label>
                                <textarea required value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" rows={3} placeholder="Card description..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Long Description (Optional)</label>
                                <textarea value={formData.longDesc} onChange={e => setFormData({ ...formData, longDesc: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-brand-500 focus:border-brand-500 outline-none" rows={3} placeholder="Full page description..." />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isNew" checked={formData.isNew} onChange={e => setFormData({ ...formData, isNew: e.target.checked })} className="rounded text-brand-600 focus:ring-brand-500" />
                            <label htmlFor="isNew" className="text-sm text-gray-700 font-medium">Mark as New Arrival</label>
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

import { useState } from 'react';
import { Search, SlidersHorizontal, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../contexts/ModalContext';

// --- Dummy Data ---
const categories = ['All', 'Mirrorless', 'DSLR', 'Lenses', 'Drones', 'Action Cameras', 'Lighting', 'Audio'];

import { useAdminStore } from '../store/adminStore';

export function Equipment() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { openModal } = useModal();
    const { products } = useAdminStore();

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6">Our Gear</h1>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for cameras, lenses, drones..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-4 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm w-full md:w-auto justify-center">
                            <SlidersHorizontal size={20} />
                            FILTERS
                        </button>
                    </div>
                </div>

                {/* Categories Rail */}
                <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold tracking-wider text-sm transition-colors border ${activeCategory === category
                                ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={product.id}
                                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                            >
                                {/* Image & Tag */}
                                <div className="bg-gray-50 rounded-2xl aspect-[4/3] mb-5 relative overflow-hidden flex items-center justify-center">
                                    <img src={product.image} alt={product.name} className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold tracking-wider ${product.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stock ? 'IN STOCK' : 'OUT OF STOCK'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="text-xs text-brand-600 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                                    <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 tracking-tight">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.desc}</p>

                                    {/* Features */}
                                    {product.features && product.features.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {product.features.map(feat => (
                                                <span key={feat} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                                                    {feat}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions & Price */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="font-black text-2xl text-gray-900 tracking-tight mb-4">
                                        {product.price}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal('product-detail', product)}
                                            className="flex-1 bg-white border border-gray-200 text-gray-900 font-bold px-4 py-3 rounded-xl tracking-wider hover:bg-gray-50 transition-colors text-xs flex justify-center items-center gap-1 cursor-pointer"
                                        >
                                            VIEW MORE
                                        </button>
                                        <button onClick={() => openModal('quote', { productName: product.name })} className="flex-1 bg-brand-600 text-white font-bold px-4 py-3 rounded-xl tracking-wider hover:bg-brand-700 transition-colors text-xs flex justify-center items-center gap-1 shadow-md cursor-pointer">
                                            <Phone size={14} /> QUOTE
                                        </button>
                                    </div>
                                </div>

                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 text-lg font-medium">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                className="mt-4 text-brand-600 font-bold tracking-wider hover:underline uppercase"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

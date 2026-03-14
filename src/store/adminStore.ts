// Provide simple global store for the mock admin data
import { create } from 'zustand';

export type Product = {
    id: string;
    name: string;
    category: string;
    price: string;
    rating: number;
    desc: string;
    isNew: boolean;
    image: string;
    images?: string[];
    stock?: boolean;
    features?: string[];
    longDesc?: string;
    oldPrice?: string;
};

export type NewsReview = {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number; // 0 for news, 1-5 for reviews
    image?: string;
};

export type AdminImage = {
    id: string;
    url: string;
    filename: string;
    createdAt: string;
};

type AdminStore = {
    products: Product[];
    newsReviews: NewsReview[];
    images: AdminImage[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, data: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    addNewsReview: (item: Omit<NewsReview, 'id'>) => void;
    updateNewsReview: (id: string, data: Partial<NewsReview>) => void;
    deleteNewsReview: (id: string) => void;

    addImage: (image: AdminImage) => void;
    deleteImage: (id: string) => void;
};

// Initial mock data
const initialProducts: Product[] = [
    { id: '1', name: 'Sony Alpha A7 R V', category: 'Mirrorless', price: '₹3,40,000', oldPrice: '₹3,60,000', rating: 5, desc: '61MP Full-Frame, 8K Video', longDesc: 'Combining resolution and precision, the Sony a7R V is the mirrorless camera designed for those who crave detail. Features a 61MP sensor and an entirely new AI-based autofocus system.', isNew: true, stock: true, features: ['61MP', '8K Video', 'AI AF'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500', images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500'] },
    { id: '2', name: 'Canon EOS R5', category: 'Mirrorless', price: '₹3,15,000', oldPrice: '₹3,40,000', rating: 5, desc: '45MP Full-Frame, 8K RAW video.', isNew: true, stock: true, features: ['45MP', '8K RAW', 'IBIS'], image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500', images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500'] },
    { id: '3', name: 'DJI Mavic 3 Pro', category: 'Drones', price: '₹2,10,000', rating: 5, desc: 'Hasselblad camera, triple-lens.', isNew: true, stock: false, features: ['4/3 CMOS', '5.1K Video', '43min max flight'], image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=500', images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=500'] },
    { id: '4', name: 'Sigma 24-70mm Lens', category: 'Lenses', price: '₹95,000', oldPrice: '₹1,05,000', rating: 4, desc: 'Art series standard zoom lens.', isNew: true, stock: true, features: ['f/2.8', 'E-mount', 'Weather Sealed'], image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=500', images: ['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=500'] },
    { id: '5', name: 'Nikon Z8', category: 'Mirrorless', price: '₹3,20,000', rating: 5, desc: '45.7MP FX-Format, 8K60p', isNew: false, stock: true, features: ['45.7MP', '8K60p', 'No Mechanical Shutter'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500' },
    { id: '6', name: 'GoPro HERO 12', category: 'Action Cameras', price: '₹40,000', rating: 4, desc: 'Waterproof Action Camera', isNew: false, stock: true, features: ['5.3K60', 'HDR Video', 'HyperSmooth 6.0'], image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500' },
    { id: '7', name: 'Sony FX3', category: 'Mirrorless', price: '₹3,80,000', rating: 5, desc: 'Cinema Line Full-Frame', isNew: false, stock: true, features: ['12.1MP', '4K120p', 'Dual Base ISO'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500' },
];

const initialNewsReviews: NewsReview[] = [
    { id: '1', content: "🎉 EXTENDED FESTIVE SALE: Flat 15% OFF on all Sony Lenses this weekend only!", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80" },
    { id: '2', content: "The Canon R5 Mark II completely changed my workflow. Unbelievable autofocus and low-light performance.", author: "Rajiv S.", role: "Filmmaker", rating: 5, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80" },
    { id: '3', content: "🚨 JUST ARRIVED: DJI Neo is now ready for demo at our main showroom.", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80" },
    { id: '4', content: "Outstanding service. The staff helped me transition from DSLR to mirrorless seamlessly.", author: "Vikram P.", role: "Wildlife Photographer", rating: 5, image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80" },
    { id: '5', content: "📸 FREE WORKSHOP: Master Portrait Lighting this Sunday at 10 AM.", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80" },
];

export const useAdminStore = create<AdminStore>((set) => ({
    products: initialProducts,
    newsReviews: initialNewsReviews,
    images: [],

    addProduct: (product) => set((state) => ({
        products: [{ ...product, id: Math.random().toString(36).substr(2, 9) }, ...state.products]
    })),
    updateProduct: (id, data) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...data } : p)
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
    })),

    addNewsReview: (item) => set((state) => ({
        newsReviews: [{ ...item, id: Math.random().toString(36).substr(2, 9) }, ...state.newsReviews]
    })),
    updateNewsReview: (id, data) => set((state) => ({
        newsReviews: state.newsReviews.map(n => n.id === id ? { ...n, ...data } : n)
    })),
    deleteNewsReview: (id) => set((state) => ({
        newsReviews: state.newsReviews.filter(n => n.id !== id)
    })),

    addImage: (image) => set((state) => ({ images: [image, ...state.images] })),
    deleteImage: (id) => set((state) => ({ images: state.images.filter(img => img.id !== id) }))
}));

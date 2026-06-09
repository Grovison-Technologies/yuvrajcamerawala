import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
    soldAt?: string | null;
};

export type ComboDeal = {
    id: string;
    name: string;
    originalPrice: string;
    discountedPrice: string;
    desc: string;
    image: string;
    items?: string[];
    isFeatured?: boolean;
};

export type NewsReview = {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number; // 0 for news, 1-5 for reviews
    image?: string;
};

export type Inquiry = {
    id: string;
    name: string;
    phone: string;
    email: string;
    requirements?: string;
    productName?: string;
    status: 'new' | 'read';
    created_at: string;
};

export type AdminImage = {
    id: string;
    url: string;
    filename: string;
    createdAt: string;
};

type AdminStore = {
    products: Product[];
    combos: ComboDeal[];
    inquiries: Inquiry[];
    newsReviews: NewsReview[];
    images: AdminImage[];
    
    // Async actions for Supabase
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    markProductSold: (id: string, isSold: boolean) => Promise<void>;
    cleanupSoldProducts: () => Promise<void>;

    fetchCombos: () => Promise<void>;
    addCombo: (combo: Omit<ComboDeal, 'id'>) => Promise<void>;
    updateCombo: (id: string, data: Partial<ComboDeal>) => Promise<void>;
    deleteCombo: (id: string) => Promise<void>;

    fetchInquiries: () => Promise<void>;
    markInquiryRead: (id: string) => Promise<void>;
    deleteInquiry: (id: string) => Promise<void>;

    addNewsReview: (item: Omit<NewsReview, 'id'>) => void;
    updateNewsReview: (id: string, data: Partial<NewsReview>) => void;
    deleteNewsReview: (id: string) => void;

    addImage: (image: AdminImage) => void;
    deleteImage: (id: string) => void;
};

const initialNewsReviews: NewsReview[] = [
    { id: '1', content: "🎉 EXTENDED FESTIVE SALE: Flat 15% OFF on all Sony Lenses this weekend only!", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80" },
    { id: '2', content: "The Canon R5 Mark II completely changed my workflow. Unbelievable autofocus and low-light performance.", author: "Rajiv S.", role: "Filmmaker", rating: 5, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80" },
    { id: '3', content: "🚨 JUST ARRIVED: DJI Neo is now ready for demo at our main showroom.", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80" },
    { id: '4', content: "Outstanding service. The staff helped me transition from DSLR to mirrorless seamlessly.", author: "Vikram P.", role: "Wildlife Photographer", rating: 5, image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80" },
    { id: '5', content: "📸 FREE WORKSHOP: Master Portrait Lighting this Sunday at 10 AM.", author: "Yuvraj Admin", role: "Store", rating: 0, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80" },
];

export const useAdminStore = create<AdminStore>((set) => ({
    products: [], 
    combos: [],
    inquiries: [],
    newsReviews: initialNewsReviews,
    images: [],

    fetchProducts: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching products:', error);
            return;
        }
        
        if (data) {
            set({ products: data as Product[] });
        }
    },

    addProduct: async (product) => {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select()
            .single();

        if (error) {
            console.error('Error adding product:', error);
            return;
        }

        if (data) {
            set((state) => ({
                products: [data as Product, ...state.products]
            }));
        }
    },

    updateProduct: async (id, dataToUpdate) => {
        const { error, data } = await supabase
            .from('products')
            .update(dataToUpdate)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating product:', error);
            return;
        }

        if (data) {
            set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...dataToUpdate, ...data } : p)
            }));
        }
    },

    deleteProduct: async (id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting product:', error);
            return;
        }

        set((state) => ({
            products: state.products.filter(p => p.id !== id)
        }));
    },

    markProductSold: async (id, isSold) => {
        const soldAt = isSold ? new Date().toISOString() : null;
        const { error, data } = await supabase
            .from('products')
            .update({ soldAt })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            console.error('Error marking product sold:', error);
            return;
        }
        if (data) {
            set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, soldAt } : p)
            }));
        }
    },

    cleanupSoldProducts: async () => {
        const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
        const { error } = await supabase
            .from('products')
            .delete()
            .not('soldAt', 'is', null)
            .lt('soldAt', fortyEightHoursAgo);
            
        if (error) {
            console.error('Error cleaning up sold products:', error);
            return;
        }
        
        // Clean up frontend state just in case
        set((state) => ({
            products: state.products.filter(p => !p.soldAt || new Date(p.soldAt) > new Date(fortyEightHoursAgo))
        }));
    },

    fetchCombos: async () => {
        const { data, error } = await supabase
            .from('combos')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching combos:', error);
            return;
        }
        if (data) set({ combos: data as ComboDeal[] });
    },

    addCombo: async (combo) => {
        const { data, error } = await supabase
            .from('combos')
            .insert([combo])
            .select()
            .single();
        if (error) {
            console.error('Error adding combo:', error);
            return;
        }
        if (data) {
            set((state) => ({ combos: [data as ComboDeal, ...state.combos] }));
        }
    },

    updateCombo: async (id, dataToUpdate) => {
        const { error, data } = await supabase
            .from('combos')
            .update(dataToUpdate)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            console.error('Error updating combo:', error);
            return;
        }
        if (data) {
            set((state) => ({
                combos: state.combos.map(c => c.id === id ? { ...c, ...dataToUpdate, ...data } : c)
            }));
        }
    },

    deleteCombo: async (id) => {
        const { error } = await supabase
            .from('combos')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting combo:', error);
            return;
        }
        set((state) => ({
            combos: state.combos.filter(c => c.id !== id)
        }));
    },

    fetchInquiries: async () => {
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching inquiries:', error);
            return;
        }
        if (data) set({ inquiries: data as Inquiry[] });
    },

    markInquiryRead: async (id) => {
        const { error, data } = await supabase
            .from('inquiries')
            .update({ status: 'read' })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            console.error('Error marking inquiry read:', error);
            return;
        }
        if (data) {
            set((state) => ({
                inquiries: state.inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i)
            }));
        }
    },

    deleteInquiry: async (id) => {
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) {
            console.error('Error deleting inquiry:', error);
            return;
        }
        set((state) => ({
            inquiries: state.inquiries.filter(i => i.id !== id)
        }));
    },

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

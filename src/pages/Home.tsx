import { motion } from 'framer-motion';
import { ChevronRight, Play, Star, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';

// --- Dummy Data ---
const categories = [
    { title: 'Mirrorless', desc: 'Next-gen performance', span: 'col-span-1 md:col-span-2 row-span-2', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' },
    { title: 'Lenses', desc: 'Crystal clear optics', span: 'col-span-1 row-span-1', image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600' },
    { title: 'Drones', desc: 'Aerial mastery', span: 'col-span-1 row-span-1', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600' },
    { title: 'Lighting', desc: 'Perfect illumination', span: 'col-span-1 md:col-span-2 row-span-1', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800' },
];

const testimonials = [
    { id: 1, text: "Yuvraj Camera Wala provided the exact lens setup I needed for my documentary. Their expertise is unmatched.", author: "Rajiv S.", role: "Filmmaker" },
    { id: 2, text: "The new Sony gear I got from them is flawless. Best camera store in India turned premium brand!", author: "Anita K.", role: "Wedding Photographer" },
    { id: 3, text: "Outstanding service. The staff helped me transition from DSLR to mirrorless seamlessly.", author: "Vikram P.", role: "Wildlife Photographer" },
];

// --- Sections ---

function HeroSection() {
    const { openModal } = useModal();

    return (
        <section className="relative h-screen flex items-center justify-start overflow-hidden">
            {/* Background Video with Light Overlay */}
            <div className="absolute inset-0 z-0 bg-gray-100 overflow-hidden pointer-events-none">
                <iframe
                    src="https://www.youtube.com/embed/3aQW0TYdffM?autoplay=1&mute=1&loop=1&playlist=3aQW0TYdffM&controls=0&showinfo=0&rel=0&modestbranding=1"
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-multiply"
                    allow="autoplay; encrypted-media"
                    title="Background Video"
                ></iframe>
            </div>
            {/* Gradient to make text readable on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 px-8 sm:px-12 md:px-20 max-w-7xl w-full mx-auto">
                <motion.div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-bold tracking-widest uppercase mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                        New Cinema Line Arrived
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-[0.9]"
                    >
                        Capture <br /><span className="text-brand-600">Perfection</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-2xl text-gray-700 font-medium mb-10 max-w-lg"
                    >
                        Elevate your craft with world-class photography and videography gear. Built for professionals, loved by creators.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 justify-start"
                    >
                        <Link to="/equipment" className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold tracking-wider hover:bg-brand-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto">
                            EXPLORE GEAR <ChevronRight size={20} />
                        </Link>
                        <button onClick={() => openModal('quote')} className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold tracking-wider hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                            GET A QUOTE
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Marquee() {
    return (
        <div className="bg-gray-900 py-3 overflow-hidden flex whitespace-nowrap">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex gap-10 text-white text-sm font-bold tracking-widest uppercase"
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="flex items-center gap-10">
                        <span>🔥 SONY ALPHA 9 III NOW IN STOCK</span>
                        <Star size={12} className="text-brand-500" />
                        <span>EXCHANGE OFFERS AVAILABLE</span>
                        <Star size={12} className="text-brand-500" />
                        <span>FREE WORKSHOP THIS WEEKEND</span>
                        <Star size={12} className="text-brand-500" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// --- New Sections ---

function SeriesBanner() {
    return (
        <section className="py-8 md:py-12 bg-white overflow-hidden">
            <div className="relative transform -skew-y-1 bg-brand-600 border-y border-brand-700 shadow-2xl overflow-hidden py-6 md:py-8">
                {/* Noise overlay */}
                <div
                    className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                ></div>

                <div className="flex whitespace-nowrap transform skew-y-1">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        className="flex gap-12 md:gap-24 items-center text-white"
                    >
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="flex items-center gap-12 md:gap-24 text-xl sm:text-4xl lg:text-5xl font-black uppercase tracking-widest text-white drop-shadow-md">
                                <span>CAPTURE EVERY DETAIL</span>
                                <span className="text-brand-300 opacity-50">•</span>
                                <span>PREMIUM CAMERA COLLECTION</span>
                                <span className="text-brand-300 opacity-50">•</span>
                                <span>UNCHARTED CLARITY</span>
                                <span className="text-brand-300 opacity-50">•</span>
                                <span>CINEMATIC EXCELLENCE</span>
                                <span className="text-brand-300 opacity-50">•</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import { useAdminStore } from '../store/adminStore';

function NewestArrivals() {
    const { openModal } = useModal();
    const { products } = useAdminStore();

    // Filter for newest arrivals, take top 4
    const newProducts = products.filter(p => p.isNew).slice(0, 4);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Soft Blurred Gradient Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-100/60 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-2"
                    >
                        Latest Gear
                    </motion.div>

                    <div className="overflow-hidden relative flex items-center h-12 sm:h-16 md:h-20 lg:h-24">
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter drop-shadow-sm text-gray-900 flex whitespace-pre-wrap">
                            {"NEWEST ARRIVALS".split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "0px" }}
                                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newProducts.map((product, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: "brightness(2) blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                            key={product.id}
                            className="bg-white border border-gray-200 shadow-sm hover:shadow-xl rounded-2xl p-5 flex flex-col group transition-all duration-300"
                        >
                            <div className="relative aspect-square bg-gray-50/80 rounded-xl mb-5 overflow-hidden flex items-center justify-center">
                                <img src={product.image} alt={product.name} className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                {product.isNew && (
                                    <div className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded shadow-sm">
                                        NEW
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{product.category}</div>
                                <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 tracking-tight group-hover:text-brand-600 transition-colors">{product.name}</h3>

                                <div className="flex gap-0.5 text-yellow-400 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} className={i >= product.rating ? "text-gray-300" : ""} />
                                    ))}
                                </div>

                                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{product.desc}</p>

                                <div className="mt-auto">
                                    <div className="font-black text-2xl text-gray-900 mb-5 tracking-tight">{product.price}</div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openModal('product-detail', product)}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-3 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer border border-transparent hover:border-gray-300"
                                        >
                                            VIEW MORE
                                        </button>
                                        <button onClick={() => openModal('quote', { productName: product.name })} className="flex-[2] bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md hover:shadow-lg">
                                            INQUIRE <ChevronRight size={14} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCategories() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase text-center mb-16">Shop by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {categories.map((cat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            key={cat.title}
                            className={`group relative rounded-3xl overflow-hidden ${cat.span}`}
                        >
                            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={cat.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white/80 text-sm font-semibold mb-1">{cat.desc}</p>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">{cat.title}</h3>
                                    <div className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white group-hover:bg-brand-600 transition-colors">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function VideoReviews() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Expert Reviews</h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">See what top professionals are saying about the latest gear available at Yuvraj Camera Wala.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={item}
                            className="group cursor-pointer"
                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 shadow-md">
                                <img src={`https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600&sig=${item}`} alt="Review thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-lg">
                                        <Play size={24} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-600 transition-colors">Is the Canon R5 Mark II Worth It?</h3>
                            <p className="text-gray-500 text-sm mt-1">By Tech Vlogger India</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase text-center mb-16">Trusted by Pros</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-zinc-50 p-8 rounded-3xl border border-gray-100">
                            <div className="flex gap-1 text-brand-500 mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-700 italic mb-8 font-medium">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${t.id}`} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{t.author}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function NewsReviewsCards() {
    const { newsReviews } = useAdminStore();
    const { openModal } = useModal();

    if (!newsReviews || newsReviews.length === 0) return null;

    return (
        <section className="py-24 bg-zinc-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4">Latest Updates & Reviews</h2>
                        <p className="text-gray-500 font-medium max-w-2xl text-sm sm:text-base">Read what our community is saying and stay updated with the latest drops.</p>
                    </div>
                </div>

                {/* Hide scrollbar but allow horizontal scroll */}
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                    {newsReviews.map((item) => (
                        <div key={item.id} className="w-[300px] shrink-0 snap-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                            {/* Header image if present */}
                            {item.image && (
                                <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
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
                                    <div className="mb-4 inline-block bg-brand-600/10 text-brand-700 text-[10px] font-bold tracking-widest px-2 py-1 rounded self-start">
                                        NEWS
                                    </div>
                                )}

                                {/* Review Stars */}
                                {item.rating > 0 && (
                                    <div className="flex gap-1 text-yellow-400 mb-4">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={14} fill={idx < item.rating ? "currentColor" : "none"} className={idx >= item.rating ? "text-gray-300" : ""} />
                                        ))}
                                    </div>
                                )}

                                <p className="text-gray-700 font-medium line-clamp-4 leading-relaxed flex-1 mb-6">"{item.content}"</p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{item.author}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</div>
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
                </div>
            </div>
        </section>
    );
}

export function Home() {
    const { openModal } = useModal();

    return (
        <div className="min-h-screen bg-white selection:bg-brand-200 selection:text-brand-900">
            <HeroSection />
            <Marquee />
            <NewestArrivals />
            <BentoCategories />
            <SeriesBanner />
            <VideoReviews />
            <Testimonials />

            {/* Final CTA Overlay */}
            <section className="py-24 bg-brand-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80")' }}></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Ready to Upgrade?</h2>
                    <p className="text-brand-100 text-base sm:text-xl mb-10 max-w-2xl mx-auto font-medium">Visit our massive store or request a custom quote online. We guarantee the best deals for professionals.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={() => openModal('quote')} className="bg-white text-brand-600 px-8 py-4 rounded-full font-bold tracking-wider hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Phone size={20} /> REQUEST QUOTE
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold tracking-wider hover:bg-white hover:text-brand-600 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                            <MapPin size={20} /> FIND STORE
                        </button>
                    </div>
                </div>
            </section>

            <NewsReviewsCards />
        </div>
    );
}

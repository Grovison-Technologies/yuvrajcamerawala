import { Link } from 'react-router-dom';
import { Camera, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-zinc-900 pt-16 pb-8 border-t border-zinc-800 text-zinc-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
                                <Camera size={18} />
                            </div>
                            <span className="font-black text-xl tracking-tighter uppercase text-white">
                                Yuvraj <span className="text-brand-600">Camera Wala</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            From a massive camera shop to a premium brand. We provide top-tier photography and videography gear for professionals and enthusiasts alike.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-zinc-800 hover:bg-brand-600 rounded-full transition-colors text-white">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 hover:bg-brand-600 rounded-full transition-colors text-white">
                                <Youtube size={18} />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 hover:bg-brand-600 rounded-full transition-colors text-white">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 hover:bg-brand-600 rounded-full transition-colors text-white">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold tracking-widest mb-6">QUICK LINKS</h3>
                        <ul className="space-y-4">
                            {['Home', 'Our Gear', 'News & Reviews', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={`/${link === 'Home' ? '' : link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                        className="text-zinc-400 hover:text-brand-500 transition-colors text-sm"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold tracking-widest mb-6">CATEGORIES</h3>
                        <ul className="space-y-4">
                            {['Mirrorless Cameras', 'DSLR Cameras', 'Premium Lenses', 'Drones & Aerial', 'Lighting & Audio'].map((category) => (
                                <li key={category}>
                                    <Link
                                        to="/equipment"
                                        className="text-zinc-400 hover:text-brand-500 transition-colors text-sm"
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info & Newsletter */}
                    <div>
                        <h3 className="text-white font-bold tracking-widest mb-6">STAY IN FOCUS</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and deal alerts.
                        </p>
                        <form className="flex gap-2 mb-8" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-zinc-800 border focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 
                  border-zinc-700 rounded p-2 text-sm flex-1 text-white placeholder-zinc-500 transition-all"
                            />
                            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded text-sm font-bold tracking-wider transition-colors">
                                SUBSCRIBE
                            </button>
                        </form>

                        <ul className="space-y-3 text-zinc-400 text-sm">
                            <li className="flex gap-3 items-start">
                                <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
                                <span>123 Camera Street, Photoville, PV 12345</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={18} className="text-brand-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={18} className="text-brand-500 shrink-0" />
                                <span>sales@yuvrajcamerawala.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-xs">
                        © {new Date().getFullYear()} Yuvraj Camera Wala. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-zinc-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

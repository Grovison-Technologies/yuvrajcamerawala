import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6"
                    >
                        Get In <span className="text-brand-600">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500"
                    >
                        Whether you need a custom quote for a studio setup or simply want to inquire about stock, our experts are ready to assist.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Contact Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-6">Store Details</h3>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-600 shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">Location</h4>
                                        <p className="text-gray-600">123 Camera Street, Photoville<br />PV 12345, India</p>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-600 shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">Direct Lines</h4>
                                        <p className="text-gray-600">+91 98765 43210<br />+91 12345 67890</p>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-600 shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">Email Support</h4>
                                        <p className="text-gray-600">sales@yuvrajcamerawala.com<br />support@yuvrajcamerawala.com</p>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-600 shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">Store Timings</h4>
                                        <p className="text-gray-600">Mon - Sat: 10:00 AM - 8:00 PM<br />Sun: Closed</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* WhatsApp Direct CTA */}
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] text-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                            <h3 className="text-xl font-black uppercase tracking-wider mb-2">WhatsApp Us</h3>
                            <p className="text-white/90 text-sm">For fastest response on quotes and availability.</p>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm h-full flex flex-col justify-center">
                            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Send a Message</h3>
                            <p className="text-gray-500 mb-8">Fill out the form below and our sales team will get back to you within 24 hours.</p>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">First Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">Last Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">Email Address</label>
                                        <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">Phone Number</label>
                                        <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors" placeholder="+91 98765 43210" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">Inquiry Type</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-gray-700 transition-colors">
                                        <option>Product Quote</option>
                                        <option>Store Availability</option>
                                        <option>Corporate Orders</option>
                                        <option>Support/Repairs</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-700 uppercase">Message</label>
                                    <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none" placeholder="Tell us about your requirements..."></textarea>
                                </div>

                                <button type="submit" className="w-full bg-brand-600 text-white font-bold tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors shadow-md hover:shadow-lg">
                                    SEND MESSAGE <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

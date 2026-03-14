import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Image as ImageIcon, MessageSquare, LogOut, ChevronLeft, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navigation = [
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Images', href: '/admin/images', icon: ImageIcon },
        { name: 'News & Reviews', href: '/admin/news', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Mobile Header Nav (Visible only on md and below) */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
                <span className="font-black text-lg tracking-tighter uppercase text-brand-600">Admin</span>
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Sidebar Overlay Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-gray-900/50 z-50 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="h-20 flex justify-between items-center px-6 border-b border-gray-200">
                        <span className="font-black text-xl tracking-tighter uppercase text-brand-600">Admin Panel</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pt-6 pb-4">
                        <nav className="px-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = location.pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={cn(
                                            isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors'
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-500',
                                                'flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition-colors'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <Link
                            to="/"
                            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition-colors" />
                            Back to Store
                        </Link>
                        <button className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
                            <LogOut className="text-red-500 group-hover:text-red-600 flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition-colors" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 md:ml-64 flex flex-col min-w-0 pt-16 md:pt-0">
                <main className="flex-1 relative overflow-y-auto w-full">
                    <div className="py-6 px-4 sm:px-6 md:px-8 max-w-full overflow-x-hidden">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

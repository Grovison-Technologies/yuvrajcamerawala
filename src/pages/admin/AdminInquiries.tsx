import { useAdminStore } from '../../store/adminStore';
import { Mail, Phone, Trash2, CheckCircle2, Circle } from 'lucide-react';

export function AdminInquiries() {
    const { inquiries, markInquiryRead, deleteInquiry } = useAdminStore();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Inquiries</h1>
                <div className="text-sm font-medium text-gray-500">
                    Total: {inquiries.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Inquiry Details</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {inquiries.map((inq) => (
                                <tr key={inq.id} className={`hover:bg-gray-50 transition-colors ${inq.status === 'new' ? 'bg-brand-50/30' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {inq.status === 'new' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
                                                <Circle size={10} className="fill-brand-600 text-brand-600" />
                                                NEW
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                                <CheckCircle2 size={12} />
                                                READ
                                            </span>
                                        )}
                                        <div className="text-xs text-gray-400 mt-2">
                                            {new Date(inq.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 mb-1">{inq.name}</div>
                                        <div className="flex flex-col gap-1">
                                            <a href={`tel:${inq.phone}`} className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1.5">
                                                <Phone size={12} /> {inq.phone}
                                            </a>
                                            <a href={`mailto:${inq.email}`} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1.5">
                                                <Mail size={12} /> {inq.email}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {inq.productName && (
                                            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
                                                Product: {inq.productName}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">
                                            {inq.requirements}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            {inq.status === 'new' && (
                                                <button
                                                    onClick={() => markInquiryRead(inq.id)}
                                                    className="text-brand-600 hover:text-brand-900 text-xs font-bold"
                                                >
                                                    MARK READ
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    if (confirm('Delete this inquiry?')) {
                                                        deleteInquiry(inq.id);
                                                    }
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {inquiries.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                                        No inquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

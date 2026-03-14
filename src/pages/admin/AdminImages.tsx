import { useState, useCallback } from 'react';
import { Upload, Trash2, Image as ImageIcon, Loader2, Copy, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useAdminStore } from '../../store/adminStore';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqq02jdo1/image/upload';
const UPLOAD_PRESET = 'upload img';

export function AdminImages() {
    const { images, addImage, deleteImage } = useAdminStore();
    const [isUploading, setIsUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsUploading(true);

        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            try {
                const response = await fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (data.secure_url) {
                    addImage({
                        id: data.public_id,
                        url: data.secure_url,
                        filename: data.original_filename + '.' + data.format,
                        createdAt: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Failed to upload image to Cloudinary.");
            }
        }

        setIsUploading(false);
    }, [addImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
        },
        maxSize: 5242880 // 5MB
    });

    const copyToClipboard = (url: string, id: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Image Library</h1>
                    <p className="text-gray-500 text-sm mt-1">Upload and manage global assets directly via Cloudinary.</p>
                </div>
            </div>

            {/* Upload Zone */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl bg-white p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragActive ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:bg-gray-50'
                    } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="bg-brand-50 p-4 rounded-full text-brand-600 mb-4">
                    {isUploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                    {isUploading ? 'Uploading...' : isDragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
                </h3>
                <p className="text-gray-500 text-sm mt-1">SVG, PNG, JPG or WEBP (max. 5MB)</p>
            </div>

            {/* Gallery Grid */}
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider pt-4">Asset Gallery ({images.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] bg-gray-100 relative">
                            <img src={img.url} className="w-full h-full object-cover" alt={img.filename} />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(img.url, img.id)}
                                    className="bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-sm font-bold"
                                    title="Copy URL"
                                >
                                    {copiedId === img.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    {copiedId === img.id ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    onClick={() => deleteImage(img.id)}
                                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                                    title="Remove from Library"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="text-xs font-bold text-gray-900 uppercase truncate" title={img.filename}>{img.filename}</div>
                            <div className="text-[10px] text-gray-500 mt-1">{new Date(img.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                ))}

                {images.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                        <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No images uploaded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
